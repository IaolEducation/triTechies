"use client";

import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDoc, setDoc, DocumentData } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, User, signOut } from "firebase/auth";
import { db, auth, googleProvider } from "@/lib/firebase";
import { Mail, Phone, DollarSign, Clock, CheckCircle, LogOut, Plus, X, Upload, Pencil, Trash2, ShieldAlert, Shield, Sparkles, PhoneCall, Handshake, Flame, Trophy, Archive, Briefcase, Users, User as UserIcon } from "lucide-react";
import { uploadImageAction } from "./actions";

const PIPELINE_STAGES = [
  { value: "NEW", label: "New Lead", color: "text-red-400", dotColor: "bg-red-400", activeBg: "bg-red-500/10 border-red-500/20 text-red-400", icon: Sparkles },
  { value: "CONTACTED", label: "Contacted", color: "text-blue-400", dotColor: "bg-blue-400", activeBg: "bg-blue-500/10 border-blue-500/20 text-blue-400", icon: PhoneCall },
  { value: "DISCUSSING", label: "Discussing", color: "text-purple-400", dotColor: "bg-purple-400", activeBg: "bg-purple-500/10 border-purple-500/20 text-purple-400", icon: Handshake },
  { value: "IN_PROGRESS", label: "In Progress", color: "text-amber-400", dotColor: "bg-amber-400", activeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400", icon: Flame },
  { value: "COMPLETED", label: "Completed", color: "text-emerald-400", dotColor: "bg-emerald-400", activeBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", icon: Trophy },
  { value: "ARCHIVED", label: "Archived", color: "text-slate-400", dotColor: "bg-slate-400", activeBg: "bg-slate-500/10 border-slate-500/20 text-slate-400", icon: Archive }
];

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  const [activeTab, setActiveTab] = useState<"pipeline" | "cms" | "settings" | "access">("pipeline");

  // Sync activeTab with URL query parameter (e.g. ?tab=cms)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab") as "pipeline" | "cms" | "settings" | "access";
    if (tabParam && ["pipeline", "cms", "settings", "access"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleTabChange = (tab: "pipeline" | "cms" | "settings" | "access") => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.pushState({}, "", url.toString());
  };
  const [admins, setAdmins] = useState<any[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [addingAdmin, setAddingAdmin] = useState(false);

  const [leads, setLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Site Availability / Settings
  const [siteConfig, setSiteConfig] = useState<DocumentData | null>(null);
  const [settingsForm, setSettingsForm] = useState({ spotsTaken: "3", spotsTotal: "5", month: "JULY", visible: true });
  const [savingSettings, setSavingSettings] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [monthDropdownUp, setMonthDropdownUp] = useState(false);
  const monthTriggerRef = useRef<HTMLButtonElement>(null);
  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const settingsLoadedRef = useRef(false);
  const [avatarError, setAvatarError] = useState(false);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // -------------------------
  // CONFIRMATION MODAL STATE
  // -------------------------
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  // -------------------------
  // TOAST SYSTEM
  // -------------------------
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: "success" | "error" }[]>([]);
  const toastId = useRef(0);
  const showToast = (msg: string, type: "success" | "error" = "success") => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };

  const handleFireError = (err: any) => {
    if (err.code === "permission-denied") {
      setError("Firebase Security Rules blocked access. Verify your Google Auth credentials.");
    } else {
      setError(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      setAvatarError(false);
      if (!currentUser) {
        setIsAdminUser(false);
        setIsSuperAdmin(false);
        setCheckingAccess(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdminUser(false);
      setIsSuperAdmin(false);
      setCheckingAccess(false);
      return;
    }

    const verifyAccess = async () => {
      setCheckingAccess(true);
      const email = user.email || "";
      if (email === "techiestri@gmail.com") {
        setIsAdminUser(true);
        setIsSuperAdmin(true);
        setCheckingAccess(false);
        return;
      }

      try {
        const docRef = doc(db, "admins", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsAdminUser(true);
          setIsSuperAdmin(false);
        } else {
          setIsAdminUser(false);
          setIsSuperAdmin(false);
        }
      } catch (e) {
        console.error("Error checking admin whitelist:", e);
        setIsAdminUser(false);
        setIsSuperAdmin(false);
      } finally {
        setCheckingAccess(false);
      }
    };

    verifyAccess();
  }, [user]);

  useEffect(() => {
    if (!user || !isAdminUser) return;

    const unsubContacts = onSnapshot(query(collection(db, "contacts"), orderBy("createdAt", "desc")), snap => {
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setError(null);
    }, err => handleFireError(err));

    const unsubProjects = onSnapshot(query(collection(db, "projects"), orderBy("createdAt", "desc")), snap => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => handleFireError(err));

    const unsubTeam = onSnapshot(query(collection(db, "team"), orderBy("createdAt", "asc")), snap => {
      setTeam(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => handleFireError(err));

    const unsubSiteConfig = onSnapshot(doc(db, "siteConfig", "availability"), snap => {
      if (snap.exists() && !settingsLoadedRef.current) {
        const data = snap.data();
        setSiteConfig(data);
        setSettingsForm({
          spotsTaken: String(data.spotsTaken ?? 3),
          spotsTotal: String(data.spotsTotal ?? 5),
          month: data.month ?? "JULY",
          visible: data.visible !== false,
        });
        settingsLoadedRef.current = true;
      }
    }, err => handleFireError(err));

    let unsubAdmins = () => {};
    if (isSuperAdmin) {
      unsubAdmins = onSnapshot(collection(db, "admins"), snap => {
        setAdmins(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }, err => handleFireError(err));
    }

    return () => { 
      unsubContacts(); 
      unsubProjects(); 
      unsubTeam();
      unsubSiteConfig();
      unsubAdmins();
    };
  }, [user, isAdminUser, isSuperAdmin]);

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); }
    catch (e: any) { alert("Auth failed: " + e.message); }
  };

  const handleLogout = () => signOut(auth);

  // -------------------------
  // PROJECTS CRUD
  // -------------------------
  const openProjectAdd = () => { setEditingProject(null); setShowProjectModal(true); };
  const openProjectEdit = (p: any) => { setEditingProject(p); setShowProjectModal(true); };

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      const tagsInput = (form.get("tags") as string) || "";
      const tagsArray = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const data = {
        title: form.get("title"),
        description: form.get("description"),
        url: form.get("url"),
        tags: tagsArray
      };

      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), data);
        showToast("Project updated.");
      } else {
        await addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp() });
        showToast("Project published.");
      }
      setShowProjectModal(false);
    } catch (err: any) { showToast(err.message, "error"); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteProject = (id: string, title: string) => {
    setConfirmModal({
      open: true,
      title: "Delete Project",
      message: `Are you sure you want to delete "${title}"?`,
      onConfirm: async () => {
        try { await deleteDoc(doc(db, "projects", id)); showToast("Project deleted."); }
        catch (e: any) { showToast("Delete failed.", "error"); }
      }
    });
  };

  // -------------------------
  // TEAM CRUD
  // -------------------------
  const openTeamAdd = () => { setEditingTeam(null); setImagePreview(null); setShowTeamModal(true); };
  const openTeamEdit = (t: any) => { setEditingTeam(t); setImagePreview(null); setShowTeamModal(true); };

  const handleSaveTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      const file = form.get("image") as File;

      let imageUrl = editingTeam ? editingTeam.imageUrl : null;
      if (file && file.size > 0) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const res = await uploadImageAction(uploadData);
        if (!res.success) throw new Error(res.error);
        imageUrl = res.url;
      }

      if (!imageUrl) throw new Error("Image requires upload.");

      const data = {
        name: form.get("name"),
        role: form.get("role"),
        description: form.get("description"),
        imageUrl,
        linkedin: (form.get("linkedin") as string)?.trim() || "",
        github: (form.get("github") as string)?.trim() || "",
        twitter: (form.get("twitter") as string)?.trim() || "",
        instagram: (form.get("instagram") as string)?.trim() || "",
        facebook: (form.get("facebook") as string)?.trim() || "",
      };

      if (editingTeam) {
        await updateDoc(doc(db, "team", editingTeam.id), data);
        showToast("Member updated.");
      } else {
        await addDoc(collection(db, "team"), { ...data, createdAt: serverTimestamp() });
        showToast("Member added.");
      }
      setShowTeamModal(false);
    } catch (err: any) { showToast(err.message, "error"); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteTeam = (id: string, name: string) => {
    setConfirmModal({
      open: true,
      title: "Remove Team Member",
      message: `Are you sure you want to remove ${name}?`,
      onConfirm: async () => {
        try { await deleteDoc(doc(db, "team", id)); showToast("Member removed."); }
        catch (e: any) { showToast("Delete failed.", "error"); }
      }
    });
  };

  // -------------------------
  // LEADS HANDLING
  // -------------------------
  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "contacts", id), { status });
      const label = PIPELINE_STAGES.find(s => s.value === status)?.label ?? status;
      showToast(`Status → ${label}`);
    }
    catch (e: any) { showToast("Update failed.", "error"); }
  };
  const deleteLead = (id: string, name: string) => {
    setConfirmModal({
      open: true,
      title: "Delete Lead Inquiry",
      message: `Are you sure you want to delete inquiry from ${name}?`,
      onConfirm: async () => {
        try { await deleteDoc(doc(db, "contacts", id)); showToast("Lead deleted."); }
        catch (e: any) { showToast("Delete failed.", "error"); }
      }
    });
  };

  // -------------------------
  // SITE CONFIG / AVAILABILITY
  // -------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const taken = Math.max(0, parseInt(settingsForm.spotsTaken, 10) || 0);
      const total = Math.max(1, parseInt(settingsForm.spotsTotal, 10) || 1);
      await setDoc(doc(db, "siteConfig", "availability"), {
        spotsTaken: taken,
        spotsTotal: total,
        month: settingsForm.month.toUpperCase().trim(),
        visible: settingsForm.visible,
        updatedAt: serverTimestamp(),
        updatedBy: user?.email,
      });
      // After saving, allow Firestore to re-seed on next page visit
      settingsLoadedRef.current = false;
      showToast("Badge updated live.");
    } catch (err: any) {
      showToast("Publish failed.", "error");
    } finally {
      setSavingSettings(false);
    }
  };

  // -------------------------
  // ADMIN WHITELIST OPERATIONS
  // -------------------------
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;
    setAddingAdmin(true);
    try {
      const email = newAdminEmail.trim().toLowerCase();
      await setDoc(doc(db, "admins", email), {
        email,
        addedBy: user?.email,
        createdAt: serverTimestamp()
      });
      setNewAdminEmail("");
      showToast("Admin access granted.");
    } catch (err: any) {
      showToast("Failed to add admin.", "error");
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleDeleteAdmin = (email: string) => {
    if (email === "techiestri@gmail.com") return;
    setConfirmModal({
      open: true,
      title: "Revoke Admin Access",
      message: `Are you sure you want to revoke access for ${email}?`,
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "admins", email));
          showToast("Access revoked.");
        } catch (e: any) {
          showToast("Revoke failed.", "error");
        }
      }
    });
  };

  if (authLoading || (user && checkingAccess)) {
    return <div className="absolute inset-0 bg-[#101010] flex items-center justify-center text-white">Loading Auth...</div>;
  }

  if (!user) {
    return (
      <div className="absolute inset-0 -mt-20 min-h-screen flex items-center justify-center p-6 bg-[#101010] z-50">
        <div className="max-w-md w-full bg-[#161616] border border-[#212121] p-10 rounded-none shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-[#101010] border border-[#212121] rounded-none flex items-center justify-center mb-8">
            <span className="text-3xl font-black text-white">tT.</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">System Access</h1>
          <p className="text-slate-400 mb-10 font-medium text-sm leading-relaxed px-4">Authorized Google Workspace personnel only.</p>
          <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 rounded-none bg-white hover:bg-slate-200 text-[#101010] px-8 py-4 font-bold transition-all shadow-xl">
            Authenticate via Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="absolute inset-0 -mt-20 min-h-screen flex items-center justify-center p-6 bg-[#101010] z-50">
        <div className="max-w-md w-full bg-[#161616] border border-[#212121] p-10 rounded-none shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-red-950/20 border border-red-900/30 rounded-none flex items-center justify-center mb-8">
            <ShieldAlert style={{ width: 40, height: 40, minWidth: 40, color: "#ef4444" }} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
          <p className="text-slate-400 mb-6 font-medium text-sm leading-relaxed px-4">
            Your account <strong>{user.email}</strong> is not whitelisted to access the admin console.
          </p>
          <p className="text-slate-500 mb-10 text-xs leading-relaxed px-4">
            Contact the super admin at <strong>techiestri@gmail.com</strong> to request permissions.
          </p>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 rounded-none bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-500 hover:text-white px-8 py-4 font-bold transition-all shadow-xl">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // SCRATCH REBUILD - No header bar, clean fluid masonry layout.
  return (
    <div 
      className="h-screen bg-[#101010] relative pb-0 px-6 md:px-12 text-[#f5f5f7] flex flex-col overflow-hidden"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 2rem)" }}
    >
      <div className="max-w-7xl w-full mx-auto relative z-10 flex-1 flex flex-col overflow-hidden">

        {/* ── TOAST STACK ── */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center pointer-events-none" style={{ minWidth: 0 }}>
          {toasts.map(t => (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-none border shadow-2xl text-sm font-bold tracking-wide ${
                t.type === "success"
                  ? "bg-[#161616] border-[#313131] text-white"
                  : "bg-red-950/80 border-red-800/60 text-red-300"
              }`}
              style={{ maxWidth: "calc(100vw - 2rem)", animation: "slideDown 0.25s ease" }}
            >
              {t.type === "success"
                ? <CheckCircle style={{ width: 16, height: 16, minWidth: 16, color: "#34d399", flexShrink: 0 }} />
                : <ShieldAlert style={{ width: 16, height: 16, minWidth: 16, color: "#f87171", flexShrink: 0 }} />}
              <span className="truncate">{t.msg}</span>
            </div>
          ))}
        </div>

        {/* ── CUSTOM CONFIRMATION MODAL ── */}
        {confirmModal.open && (
          <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-xs flex items-[flex-start] sm:items-center justify-center p-4 pt-16 sm:pt-4">
            <div
              className="bg-[#161616] border border-[#313131] rounded-none max-w-md w-full p-6 shadow-2xl flex flex-col gap-5"
              style={{ animation: "slideDown 0.25s ease" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-red-950/40 border border-red-900/50 flex items-center justify-center text-red-400 shrink-0">
                  <Trash2 style={{ width: 20, height: 20, minWidth: 20 }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{confirmModal.title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Confirmation required</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{confirmModal.message}</p>
              <div className="flex justify-end gap-3 pt-2 border-t border-[#212121]">
                <button
                  type="button"
                  onClick={() => setConfirmModal(prev => ({ ...prev, open: false }))}
                  className="px-5 py-2.5 bg-[#101010] text-slate-300 hover:bg-[#212121] hover:text-white border border-[#212121] text-xs font-bold rounded-none transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    confirmModal.onConfirm();
                    setConfirmModal(prev => ({ ...prev, open: false }));
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-none transition-colors shadow-lg"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row justify-between items-center mb-8 gap-4 bg-transparent md:bg-[#161616] p-0 md:p-6 rounded-none border-0 md:border border-[#212121] shadow-none md:shadow-xl">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">Command Center</h1>
            <p className="text-slate-500 text-sm font-medium hidden sm:block">Real-time CMS and Operations grid.</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
            <div className="flex items-center gap-2 bg-[#101010] p-1.5 sm:px-4 sm:py-2 rounded-none border border-[#212121] shrink-0 min-w-0">
              {user.photoURL && !avatarError ? (
                <img 
                  src={user.photoURL} 
                  alt="User" 
                  style={{ width: "32px", height: "32px" }}
                  className="rounded-none object-cover border border-[#212121] shrink-0" 
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div 
                  style={{ width: "32px", height: "32px" }}
                  className="rounded-none bg-slate-800/60 text-slate-400 flex items-center justify-center border border-[#212121] shrink-0"
                >
                  <UserIcon size={18} className="shrink-0" />
                </div>
              )}
              <div className="hidden sm:flex flex-col justify-center min-w-0">
                <p className="text-sm font-bold text-white leading-none truncate">{user.displayName || "Admin"}</p>
                <p className="text-xs text-slate-500 mt-1 truncate">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              style={{ width: "36px", height: "36px" }}
              className="bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white rounded-none transition-all shrink-0 flex items-center justify-center" 
              title="Logout"
            >
              <LogOut size={18} className="shrink-0" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-950/40 border border-red-800/50 rounded-none text-red-300 font-medium flex items-center gap-4 shadow-xl">
            <ShieldAlert style={{ width: 24, height: 24, minWidth: 24, flexShrink: 0 }} /> {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-[#161616] p-1.5 rounded-none border border-[#212121] max-w-xl">
          <button
            onClick={() => handleTabChange("pipeline")}
            className={`flex-1 py-3 px-4 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "pipeline"
                ? "bg-[#f5f5f7] text-[#101010] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Inquiries
          </button>
          <button
            onClick={() => handleTabChange("cms")}
            className={`flex-1 py-3 px-4 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "cms"
                ? "bg-[#f5f5f7] text-[#101010] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            CMS
          </button>
          <button
            onClick={() => handleTabChange("settings")}
            className={`flex-1 py-3 px-4 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "settings"
                ? "bg-[#f5f5f7] text-[#101010] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Settings
          </button>
          {isSuperAdmin && (
            <button
              onClick={() => handleTabChange("access")}
              className={`flex-1 py-3 px-4 rounded-none text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "access"
                  ? "bg-[#f5f5f7] text-[#101010] shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Access
            </button>
          )}
        </div>

        {/* Tab content 1: Pipeline */}
        {activeTab === "pipeline" && (
          <div className="bg-transparent md:bg-[#161616] border-0 md:border border-[#212121] rounded-none p-0 md:p-10 shadow-none md:shadow-xl flex-1 flex flex-col overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Client Inquiries Pipeline
                <span className="bg-[#212121] text-white px-2 py-0.5 rounded-none text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-[#313131]">
                  {leads.length} Active
                </span>
              </h2>
            </div>

            <div
              className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)'
              }}
            >
              {leads.length === 0 ? (
                <div className="py-24 text-center text-slate-500 font-bold bg-[#101010] rounded-none border border-[#212121] border-dashed text-sm flex flex-col items-center gap-4">
                  <Mail style={{ width: 40, height: 40, minWidth: 40, opacity: 0.2 }} /> No incoming inquiries at the moment.
                </div>
              ) : (
                leads.map(lead => {
                  const currentStage = PIPELINE_STAGES.find(s => s.value === (lead.status || "NEW")) || PIPELINE_STAGES[0];
                  return (
                    <div key={lead.id} className="bg-[#101010] p-4 sm:p-8 rounded-none border border-[#212121] flex flex-col gap-4 sm:gap-6 relative overflow-hidden group hover:border-[#313131] transition-colors shrink-0">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
                        <div>
                          <h3 className="font-black text-lg sm:text-2xl text-white mb-2">{lead.name}</h3>
                          <div className="flex flex-wrap gap-3 sm:gap-4">
                            <a href={`mailto:${lead.email}`} className="text-slate-400 text-xs sm:text-sm flex items-center gap-2 hover:underline font-medium"><Mail size={16} className="text-slate-400 shrink-0" /> {lead.email}</a>
                            <a href={`tel:${lead.phone}`} className="text-slate-400 text-xs sm:text-sm flex items-center gap-2 hover:underline font-medium"><Phone size={16} className="text-slate-400 shrink-0" /> {lead.phone}</a>
                          </div>
                        </div>
                        <div className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-none border uppercase tracking-widest ${currentStage.activeBg}`}>
                          {currentStage.label}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#212121] z-10 relative">
                        <div className="flex items-center gap-3 text-sm text-slate-300 font-bold bg-[#161616] p-4 rounded-none border border-[#212121]">
                          <DollarSign style={{ width: 20, height: 20, minWidth: 20, color: "#34d399" }} /> {lead.budget}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-300 font-bold bg-[#161616] p-4 rounded-none border border-[#212121]">
                          <Clock style={{ width: 20, height: 20, minWidth: 20, color: "#fb923c" }} /> {lead.timeline}
                        </div>
                      </div>

                      <div className="bg-[#161616] p-6 rounded-none border border-[#212121] z-10 relative">
                        <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Project Specification</div>
                        <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{lead.description}</p>
                      </div>

                      {/* Interactive Pipeline Timeline Status Panel */}
                      <div className="bg-[#161616] p-4 sm:p-6 rounded-none border border-[#212121] z-10 relative">
                        <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest flex items-center justify-between">
                          <span>Pipeline Timeline Tracker</span>
                          <span className="text-[10px] text-slate-400 lowercase font-normal italic hidden sm:inline">Click any stage to update status</span>
                        </div>
                        
                        {/* Timeline Stepper Container */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {PIPELINE_STAGES.map((stage) => {
                            const isCurrent = (lead.status || "NEW") === stage.value;
                            const StageIcon = stage.icon;
                            return (
                              <button
                                key={stage.value}
                                onClick={() => updateLeadStatus(lead.id, stage.value)}
                                className={`flex flex-col items-center justify-center p-2 sm:p-3 border transition-all rounded-none ${
                                  isCurrent
                                    ? `${stage.activeBg} border-current border-opacity-40`
                                    : "border-[#212121] bg-[#101010] hover:bg-[#1a1a1a] hover:border-[#313131]"
                                }`}
                              >
                                <StageIcon size={20} className={`mb-1.5 shrink-0 ${isCurrent ? stage.color : "text-slate-500 opacity-60"}`} />
                                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${isCurrent ? stage.color : "text-slate-500"}`}>
                                  {stage.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 z-10 relative">
                        <button onClick={() => deleteLead(lead.id, lead.name)} className="px-5 py-3 bg-[#161616] text-red-400 hover:bg-red-500 hover:text-white text-sm font-bold rounded-none transition-all border border-[#212121] flex items-center justify-center gap-2">
                          <Trash2 style={{ width: 16, height: 16, minWidth: 16, flexShrink: 0 }} /> Delete Log
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab content 1.5: Site Settings */}
        {activeTab === "settings" && (
          <div className="bg-transparent md:bg-[#161616] border-0 md:border border-[#212121] rounded-none p-0 md:p-10 shadow-none md:shadow-xl flex-1 flex flex-col overflow-hidden mb-6">
            <div className="flex items-center gap-3 mb-6 shrink-0">
              <div className="w-10 h-10 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle style={{ width: 20, height: 20, minWidth: 20 }} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Site Settings</h2>
                <p className="text-slate-500 text-sm font-medium hidden sm:block">Control the live availability badge on the homepage.</p>
                <p className="text-slate-500 text-sm font-medium sm:hidden">Manage live badge.</p>
              </div>
            </div>

            {/* Live Preview */}
            <div className="mb-6 bg-[#101010] border border-[#212121] rounded-none p-6 shrink-0">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Live Badge Preview</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                <span className="text-[13px] font-bold text-white tracking-wider">
                  {settingsForm.visible
                    ? `${Math.max(0, (parseInt(settingsForm.spotsTotal,10)||0) - (parseInt(settingsForm.spotsTaken,10)||0))}/${settingsForm.spotsTotal} SPOTS LEFT FOR ${settingsForm.month.toUpperCase()}`
                    : "NOW ACCEPTING NEW CLIENTS"}
                </span>
              </div>
            </div>

            <div
              className="flex-1 overflow-y-auto custom-scrollbar"
              style={{
                maskImage: 'linear-gradient(to bottom, black calc(100% - 40px), transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 40px), transparent)',
              }}
            >
            <form onSubmit={handleSaveSettings} className="flex flex-col gap-5 pb-10">
              {/* Visibility Toggle */}
              <div className="bg-[#101010] border border-[#212121] rounded-none p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white mb-1">Show Spots Counter</p>
                  <p className="text-xs text-slate-500">When off, shows &quot;NOW ACCEPTING NEW CLIENTS&quot; instead.</p>
                </div>
                {/* iOS pill toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={settingsForm.visible}
                  onClick={() => setSettingsForm(f => ({ ...f, visible: !f.visible }))}
                  className={`relative shrink-0 w-[52px] h-[30px] rounded-full border-0 outline-none transition-colors duration-300 ${
                    settingsForm.visible ? "bg-emerald-500" : "bg-[#3a3a3a]"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                      settingsForm.visible ? "left-[23px]" : "left-[3px]"
                    }`}
                  />
                </button>
              </div>

              {/* Spots + Month Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Spots Taken</label>
                  <input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={settingsForm.spotsTaken}
                    onChange={e => {
                      const raw = e.target.value;
                      if (raw === "" || raw === "-") { setSettingsForm(f => ({ ...f, spotsTaken: raw })); return; }
                      const n = parseInt(raw, 10);
                      if (!isNaN(n) && n >= 0) setSettingsForm(f => ({ ...f, spotsTaken: String(n) }));
                    }}
                    className="w-full bg-[#101010] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500 text-2xl font-black text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Total Spots</label>
                  <input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={settingsForm.spotsTotal}
                    onChange={e => {
                      const raw = e.target.value;
                      if (raw === "") { setSettingsForm(f => ({ ...f, spotsTotal: raw })); return; }
                      const n = parseInt(raw, 10);
                      if (!isNaN(n) && n >= 1) setSettingsForm(f => ({ ...f, spotsTotal: String(n) }));
                    }}
                    className="w-full bg-[#101010] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500 text-2xl font-black text-center"
                  />
                </div>
                {/* Custom Month Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Month</label>
                  <button
                    ref={monthTriggerRef}
                    type="button"
                    onClick={() => {
                      if (!monthDropdownOpen) {
                        const rect = monthTriggerRef.current?.getBoundingClientRect();
                        const spaceBelow = window.innerHeight - (rect?.bottom ?? 0);
                        setMonthDropdownUp(spaceBelow < 260);
                      }
                      setMonthDropdownOpen(o => !o);
                    }}
                    className="w-full bg-[#101010] border border-[#212121] rounded-none px-4 py-3 text-white text-sm font-bold uppercase text-left flex items-center justify-between gap-2 hover:border-slate-500 transition-colors"
                  >
                    <span>{settingsForm.month}</span>
                    <svg
                      style={{
                        width: 16,
                        height: 16,
                        minWidth: 16,
                        flexShrink: 0,
                        color: "#94a3b8",
                        transform: monthDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                      }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {monthDropdownOpen && (
                    <>
                      {/* Click-outside overlay */}
                      <div
                        className="fixed inset-0 z-[90]"
                        onClick={() => setMonthDropdownOpen(false)}
                      />
                      {/* Dropdown list */}
                      <div
                        ref={monthDropdownRef}
                        className={`absolute left-0 right-0 z-[100] bg-[#161616] border border-[#313131] shadow-2xl overflow-y-auto ${
                          monthDropdownUp ? "bottom-full mb-1" : "top-full mt-1"
                        }`}
                        style={{ maxHeight: "240px" }}
                      >
                        {["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"].map(m => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => { setSettingsForm(f => ({ ...f, month: m })); setMonthDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-sm font-bold uppercase transition-colors ${
                              settingsForm.month === m
                                ? "bg-white text-[#101010]"
                                : "text-slate-300 hover:bg-[#212121] hover:text-white"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-8 py-3 bg-white text-[#101010] font-bold rounded-none hover:bg-slate-200 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  <CheckCircle style={{ width: 16, height: 16, minWidth: 16, flexShrink: 0 }} />
                  {savingSettings ? "Publishing..." : "Publish to Live Site"}
                </button>
              </div>
            </form>
            </div>
          </div>
        )}

        {/* Tab content 2: CMS */}
        {activeTab === "cms" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 flex-1 overflow-hidden mb-6">
            {/* Live Projects Panel */}
            <div className="bg-transparent md:bg-[#161616] border-0 md:border border-[#212121] rounded-none p-0 md:p-8 shadow-none md:shadow-xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Briefcase style={{ width: 20, height: 20, minWidth: 20, color: "#94a3b8", flexShrink: 0 }} /> Live Projects
                </h2>
                <button onClick={openProjectAdd} className="bg-white hover:bg-[#a1a1aa] text-[#101010] px-3 py-1.5 rounded-none text-xs font-bold transition-all shadow flex items-center gap-1">
                  <Plus style={{ width: 12, height: 12, minWidth: 12, flexShrink: 0 }} /> New Project
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)'
                }}
              >
                {projects.length === 0 && <p className="text-slate-500 text-sm text-center py-8">No active projects.</p>}
                {projects.map(p => (
                  <div key={p.id} className="group bg-[#101010] border border-[#212121] rounded-none p-4 transition-all hover:border-[#313131] shadow-lg">
                    <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 truncate mb-3 opacity-80">{p.url}</p>
                    {p.description && (
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{p.description}</p>
                    )}
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openProjectEdit(p)} className="p-2 bg-[#161616] border border-[#212121] text-white rounded-none hover:bg-slate-800 transition" title="Edit"><Pencil style={{ width: 12, height: 12, minWidth: 12 }} /></button>
                      <button onClick={() => handleDeleteProject(p.id, p.title)} className="p-2 bg-red-950/40 border border-red-900/30 text-red-400 rounded-none hover:bg-red-900 transition" title="Delete"><Trash2 style={{ width: 12, height: 12, minWidth: 12 }} /></button>
                    </div>
                  </div>
                ))}
                <div className="h-20 shrink-0" />
              </div>
            </div>

            {/* Team Roster Panel */}
            <div className="bg-transparent md:bg-[#161616] border-0 md:border border-[#212121] rounded-none p-0 md:p-8 shadow-none md:shadow-xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Users style={{ width: 20, height: 20, minWidth: 20, color: "#94a3b8", flexShrink: 0 }} /> Team Roster
                </h2>
                <button onClick={openTeamAdd} className="bg-white hover:bg-[#a1a1aa] text-[#101010] px-3 py-1.5 rounded-none text-xs font-bold transition-all shadow flex items-center gap-1">
                  <Plus style={{ width: 12, height: 12, minWidth: 12, flexShrink: 0 }} /> New Member
                </button>
              </div>

              <div
                className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)'
                }}
              >
                {team.length === 0 && <p className="text-slate-500 text-sm text-center py-8">No team members.</p>}
                {team.map(t => (
                  <div key={t.id} className="group bg-[#101010] border border-[#212121] rounded-none p-4 flex justify-between items-center transition-all hover:border-[#313131]">
                    <div className="flex items-center gap-3">
                      <img src={t.imageUrl} alt={t.name} className="w-10 h-10 rounded-none border border-[#212121] object-cover" />
                      <div>
                        <h3 className="font-bold text-white text-sm line-clamp-1">{t.name}</h3>
                        <p className="text-xs text-slate-400">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openTeamEdit(t)} className="p-2 bg-[#161616] border border-[#212121] text-white rounded-none hover:bg-slate-800 transition" title="Edit"><Pencil style={{ width: 12, height: 12, minWidth: 12 }} /></button>
                      <button onClick={() => handleDeleteTeam(t.id, t.name)} className="p-2 bg-red-950/40 border border-red-900/30 text-red-400 rounded-none hover:bg-red-900 transition" title="Delete"><Trash2 style={{ width: 12, height: 12, minWidth: 12 }} /></button>
                    </div>
                  </div>
                ))}
                <div className="h-20 shrink-0" />
              </div>
            </div>
          </div>
        )}

        {/* Tab content 3: Access Control (Super Admin Only) */}
        {activeTab === "access" && isSuperAdmin && (
          <div className="bg-transparent md:bg-[#161616] border-0 md:border border-[#212121] rounded-none p-0 md:p-10 shadow-none md:shadow-xl w-full flex-1 flex flex-col overflow-hidden mb-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-none bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Shield style={{ width: 20, height: 20, minWidth: 20 }} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Access Control</h2>
                <p className="text-slate-500 text-sm font-medium">Manage whitelisted administrator permissions.</p>
              </div>
            </div>

            <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-3 mb-8 bg-[#101010] p-4 rounded-none border border-[#212121]">
              <input
                required
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="flex-1 bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500 text-sm"
              />
              <button
                type="submit"
                disabled={addingAdmin}
                className="bg-white hover:bg-slate-200 text-[#101010] px-6 py-3 rounded-none text-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Plus style={{ width: 16, height: 16, minWidth: 16, flexShrink: 0 }} /> {addingAdmin ? "Whitelisting..." : "Grant Access"}
              </button>
            </form>

            <div
              className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 16px), transparent)'
              }}
            >
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 mb-1">Whitelisted Users</div>
              
              <div className="bg-[#101010] border border-[#212121] rounded-none p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold text-xs">SA</div>
                  <div>
                    <p className="text-sm font-bold text-white">techiestri@gmail.com</p>
                    <p className="text-xs text-amber-500/80 font-medium">System Super Administrator</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2.5 py-1 rounded-none">Owner</span>
              </div>

              {admins.filter(a => a.email !== "techiestri@gmail.com").length === 0 && (
                <p className="text-slate-500 text-sm text-center py-6">No additional whitelisted admins.</p>
              )}

              {admins
                .filter(a => a.email !== "techiestri@gmail.com")
                .map(admin => (
                  <div key={admin.id} className="bg-[#101010] border border-[#212121] rounded-none p-4 flex justify-between items-center hover:border-[#313131] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">AD</div>
                      <div>
                        <p className="text-sm font-bold text-white">{admin.email}</p>
                        {admin.addedBy && (
                          <p className="text-[10px] text-slate-500 mt-0.5">Added by {admin.addedBy}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAdmin(admin.email)}
                      className="shrink-0 p-2.5 bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white rounded-none transition-all flex items-center justify-center"
                      title="Revoke Permission"
                    >
                      <Trash2 style={{ width: 16, height: 16, minWidth: 16, flexShrink: 0 }} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {showProjectModal && (
        <div className="fixed inset-0 z-[100] bg-[#101010]/90 backdrop-blur-xl flex items-center justify-center p-4">
          <form onSubmit={handleSaveProject} className="bg-[#161616] w-full max-w-lg rounded-none border border-[#212121] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 border-b border-[#212121] flex justify-between items-center">
              <h3 className="font-bold text-xl text-white">{editingProject ? "Edit Project" : "New Project"}</h3>
              <button type="button" onClick={() => setShowProjectModal(false)} className="p-2 hover:bg-[#a1a1aa] rounded-none transition-colors"><X style={{ width: 20, height: 20, minWidth: 20, color: "#94a3b8" }} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4 bg-[#101010]">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                <input required defaultValue={editingProject?.title} name="title" className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea required defaultValue={editingProject?.description} name="description" rows={3} className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Project Link</label>
                <input required defaultValue={editingProject?.url} name="url" type="url" className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tags (Optional)</label>
                <input defaultValue={editingProject?.tags?.join(", ")} name="tags" className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white outline-none focus:border-slate-500" placeholder="Next.js, Firebase, Dashboard" />
              </div>

              <div className="rounded-none border border-[#212121] bg-[#161616] p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Preview Note</p>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Card preview is generated automatically from the project link. No manual image upload is needed.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-[#212121] flex justify-end gap-3 bg-[#161616]">
              <button type="button" onClick={() => setShowProjectModal(false)} className="px-6 py-3 font-bold text-slate-400 hover:text-white transition">Cancel</button>
              <button disabled={isSubmitting} type="submit" className="px-8 py-3 bg-white text-[#101010] font-bold rounded-none hover:bg-slate-200 disabled:opacity-50 transition-colors">
                {isSubmitting ? "Syncing..." : "Publish Data"}
              </button>
            </div>
          </form>
        </div>
      )}

      {showTeamModal && (
        <div className="fixed inset-0 z-[100] bg-[#101010]/90 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
          <form onSubmit={handleSaveTeam} className="bg-[#161616] w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] rounded-none border-0 sm:border border-[#212121] shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#212121] flex justify-between items-center bg-[#161616] shrink-0">
              <div>
                <h3 className="font-bold text-xl sm:text-2xl text-white">{editingTeam ? "Modify Member" : "New Member"}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage team profile, social links, and avatar image.</p>
              </div>
              <button type="button" onClick={() => setShowTeamModal(false)} className="p-2 hover:bg-[#212121] rounded-none transition-colors"><X style={{ width: 22, height: 22, minWidth: 22, color: "#94a3b8" }} /></button>
            </div>

            {/* Scrollable Body */}
            <div className="p-5 sm:p-6 flex flex-col gap-6 bg-[#101010] flex-1 overflow-y-auto custom-scrollbar">
              {/* Name & Role side-by-side on tablet/desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input required defaultValue={editingTeam?.name} name="name" placeholder="e.g. Talib Hassan" className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white text-sm outline-none focus:border-slate-500 font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Role Label</label>
                  <input required defaultValue={editingTeam?.role} name="role" placeholder="e.g. Software Developer" className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white text-sm outline-none focus:border-slate-500 font-medium" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Short Bio / Description</label>
                <textarea required defaultValue={editingTeam?.description} name="description" rows={3} placeholder="Brief summary of experience, expertise, and contribution..." className="w-full bg-[#161616] border border-[#212121] rounded-none px-4 py-3 text-white text-sm outline-none focus:border-slate-500 resize-none font-medium leading-relaxed" />
              </div>

              {/* Social Links Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Social Media Links</label>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Optional</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#161616] p-4 border border-[#212121]">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">LinkedIn</label>
                    <input defaultValue={editingTeam?.linkedin} name="linkedin" placeholder="https://linkedin.com/in/username" className="w-full bg-[#101010] border border-[#212121] px-3.5 py-2.5 text-xs text-white outline-none focus:border-slate-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">GitHub</label>
                    <input defaultValue={editingTeam?.github} name="github" placeholder="https://github.com/username" className="w-full bg-[#101010] border border-[#212121] px-3.5 py-2.5 text-xs text-white outline-none focus:border-slate-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">X / Twitter</label>
                    <input defaultValue={editingTeam?.twitter} name="twitter" placeholder="https://x.com/username" className="w-full bg-[#101010] border border-[#212121] px-3.5 py-2.5 text-xs text-white outline-none focus:border-slate-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Instagram</label>
                    <input defaultValue={editingTeam?.instagram} name="instagram" placeholder="https://instagram.com/username" className="w-full bg-[#101010] border border-[#212121] px-3.5 py-2.5 text-xs text-white outline-none focus:border-slate-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Facebook</label>
                    <input defaultValue={editingTeam?.facebook} name="facebook" placeholder="https://facebook.com/username" className="w-full bg-[#101010] border border-[#212121] px-3.5 py-2.5 text-xs text-white outline-none focus:border-slate-500" />
                  </div>
                </div>
              </div>

              {/* Avatar Image Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                {editingTeam && (
                  <div className="flex items-center gap-4 bg-[#161616] p-4 rounded-none border border-[#212121]">
                    <img src={editingTeam.imageUrl} className="w-28 h-28 sm:w-32 sm:h-32 rounded-none border border-[#212121] object-cover shrink-0" />
                    <div>
                      <p className="text-base font-bold text-white mb-1">Current Photo</p>
                      <p className="text-xs text-slate-400 font-medium">Active roster image.</p>
                    </div>
                  </div>
                )}

                <div className={editingTeam ? "" : "sm:col-span-2"}>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{editingTeam ? "Upload Replacement Photo" : "Upload Photo (Limit 4MB)"}</label>
                  <div className="w-full relative bg-[#161616] border border-[#212121] border-dashed rounded-none px-4 py-8 text-center hover:bg-slate-900 transition-colors cursor-pointer group overflow-hidden min-h-[110px] flex items-center justify-center">
                    {imagePreview ? (
                      <div className="absolute inset-0 p-2 flex items-center justify-center bg-[#101010]">
                        <img src={imagePreview} className="w-full h-full object-contain rounded-none" />
                      </div>
                    ) : (
                      <div>
                        <Upload style={{ width: 24, height: 24, minWidth: 24, color: "#475569", margin: "0 auto 8px" }} className="group-hover:text-slate-400 transition-colors" />
                        <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors block">Click to select photo</span>
                      </div>
                    )}
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!editingTeam}
                      onChange={(e) => {
                        if (e.target.files?.[0]) setImagePreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-4 sm:p-5 border-t border-[#212121] flex justify-end gap-3 bg-[#161616] shrink-0">
              <button type="button" onClick={() => setShowTeamModal(false)} className="px-6 py-3 font-bold text-slate-400 hover:text-white transition text-xs uppercase tracking-wider">Cancel</button>
              <button disabled={isSubmitting} type="submit" className="px-8 py-3 bg-white text-[#101010] font-bold rounded-none hover:bg-slate-200 disabled:opacity-50 transition-colors text-xs uppercase tracking-wider">
                {isSubmitting ? "Uploading..." : "Publish Data"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
