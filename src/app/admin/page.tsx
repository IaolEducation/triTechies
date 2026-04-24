"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, User, signOut } from "firebase/auth";
import { db, auth, googleProvider } from "@/lib/firebase";
import { Mail, Phone, DollarSign, Clock, CheckCircle, LogOut, Plus, X, Upload, Pencil, Trash2, ShieldAlert } from "lucide-react";
import { uploadImageAction } from "./actions";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [leads, setLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);
  
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
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

    return () => { unsubContacts(); unsubProjects(); unsubTeam(); };
  }, [user]);

  const handleFireError = (err: any) => {
    if (err.code === "permission-denied") {
      setError("Firebase Security Rules blocked access. Verify your Google Auth credentials.");
    } else {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); } 
    catch (e: any) { alert("Auth failed: " + e.message); }
  };

  const handleLogout = () => signOut(auth);

  // -------------------------
  // PROJECTS CRUD
  // -------------------------
  const openProjectAdd = () => { setEditingProject(null); setProjectImagePreview(null); setShowProjectModal(true); };
  const openProjectEdit = (p: any) => { setEditingProject(p); setProjectImagePreview(null); setShowProjectModal(true); };
  
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      const tagsArray = (form.get("tags") as string).split(",").map(t => t.trim());
      
      const file = form.get("image") as File;
      let imageUrl = editingProject ? editingProject.imageUrl : null;
      
      if (file && file.size > 0) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const res = await uploadImageAction(uploadData);
        if(!res.success) throw new Error(res.error);
        imageUrl = res.url;
      }
      
      const data = {
        title: form.get("title"),
        description: form.get("description"),
        url: form.get("url"),
        tags: tagsArray,
        ...(imageUrl && { imageUrl })
      };

      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), data);
      } else {
        await addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp() });
      }
      setShowProjectModal(false);
    } catch (err: any) { alert(err.message); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if(!window.confirm(`Permanently delete project: ${title}?`)) return;
    try { await deleteDoc(doc(db, "projects", id)); } 
    catch (e: any) { alert("Failed to delete: " + e.message); }
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
        if(!res.success) throw new Error(res.error);
        imageUrl = res.url;
      }

      if (!imageUrl) throw new Error("Image requires upload.");

      const data = { 
        name: form.get("name"), 
        role: form.get("role"), 
        description: form.get("description"),
        imageUrl 
      };

      if (editingTeam) {
        await updateDoc(doc(db, "team", editingTeam.id), data);
      } else {
        await addDoc(collection(db, "team"), { ...data, createdAt: serverTimestamp() });
      }
      setShowTeamModal(false);
    } catch (err: any) { alert(err.message); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteTeam = async (id: string, name: string) => {
    if(!window.confirm(`Permanently remove team member: ${name}?`)) return;
    try { await deleteDoc(doc(db, "team", id)); } 
    catch (e: any) { alert("Failed to delete: " + e.message); }
  };

  // -------------------------
  // LEADS HANDLING
  // -------------------------
  const markProcessed = async (id: string) => {
    try { await updateDoc(doc(db, "contacts", id), { status: "PROCESSED" }); } 
    catch (e: any) { alert(e.message); }
  };
  const deleteLead = async (id: string, name: string) => {
    if(!window.confirm(`Permanently delete lead from ${name}?`)) return;
    try { await deleteDoc(doc(db, "contacts", id)); } 
    catch (e: any) { alert(e.message); }
  };

  if (authLoading) return <div className="absolute inset-0 bg-[#0b1120] flex items-center justify-center text-white">Loading Auth...</div>;

  if (!user) {
    return (
      <div className="absolute inset-0 -mt-20 min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0b1120] to-[#0f172a] z-50">
        <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-2xl border border-slate-800 p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-[-10%] w-[20vw] h-[20vw] rounded-full bg-accent-light blur-[80px] opacity-20 pointer-events-none" />
          <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-6">
            <span className="text-3xl font-black text-white">tT.</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">System Access</h1>
          <p className="text-slate-400 mb-10 font-medium text-sm leading-relaxed px-4">Authorized Google Workspace personnel only.</p>
          <button onClick={handleLogin} className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white hover:bg-slate-200 text-slate-900 px-8 py-4 font-bold transition-all shadow-xl hover:scale-[1.02]">
            Authenticate via Google
          </button>
        </div>
      </div>
    );
  }

  // SCRATCH REBUILD - No header bar, clean fluid masonry layout.
  return (
    <div className="-mt-20 min-h-screen bg-[#070b14] relative pt-32 pb-24 px-6 md:px-12">
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-brand-200 blur-[200px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-accent-light blur-[150px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* User Status Floating Corner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6 bg-slate-900/30 p-6 rounded-3xl border border-slate-800/50 backdrop-blur-md">
           <div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-1">Command Center</h1>
              <p className="text-slate-500 text-sm font-medium">Real-time CMS and Operations grid.</p>
           </div>
           
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-slate-950/50 px-4 py-2 rounded-2xl border border-slate-800">
                <img src={user.photoURL || ""} alt="User" className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none">{user.displayName}</p>
                  <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                </div>
             </div>
             <button onClick={handleLogout} className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all" title="Logout">
                <LogOut className="w-5 h-5"/>
             </button>
           </div>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-950/40 border border-red-900/50 rounded-2xl text-red-400 font-medium flex items-center gap-4 shadow-xl">
            <ShieldAlert className="w-6 h-6 flex-shrink-0" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
           
           {/* LEFT COLUMN: Data Grids (Projects & Team) */}
           <div className="xl:col-span-4 flex flex-col gap-8">
              
              {/* Projects */}
              <div className="bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-accent-light" /> Live Projects
                    </h2>
                    <button onClick={openProjectAdd} className="bg-white hover:bg-slate-200 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1">
                       <Plus className="w-3 h-3"/> New
                    </button>
                 </div>
                 
                 <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {projects.length === 0 && <p className="text-slate-500 text-sm text-center py-8">No active projects.</p>}
                    {projects.map(p => (
                       <div key={p.id} className="group bg-slate-950/40 border border-slate-800/50 rounded-2xl p-4 transition-all hover:border-slate-700 hover:bg-slate-900">
                          <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{p.title}</h3>
                          <p className="text-xs text-accent-light truncate mb-4 opacity-70">{p.url}</p>
                          <div className="flex gap-2 justify-end">
                             <button onClick={() => openProjectEdit(p)} className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition" title="Edit"><Pencil className="w-3 h-3"/></button>
                             <button onClick={() => handleDeleteProject(p.id, p.title)} className="p-2 bg-red-950/40 text-red-400 rounded-lg hover:bg-red-900 transition" title="Delete"><Trash2 className="w-3 h-3"/></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Team */}
              <div className="bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-brand-200" /> Team Roster
                    </h2>
                    <button onClick={openTeamAdd} className="bg-white hover:bg-slate-200 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1">
                       <Plus className="w-3 h-3"/> New
                    </button>
                 </div>
                 
                 <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {team.length === 0 && <p className="text-slate-500 text-sm text-center py-8">No team members.</p>}
                    {team.map(t => (
                       <div key={t.id} className="group bg-slate-950/40 border border-slate-800/50 rounded-2xl p-4 flex justify-between items-center transition-all hover:border-slate-700 hover:bg-slate-900">
                          <div className="flex items-center gap-3">
                             <img src={t.imageUrl} alt={t.name} className="w-10 h-10 rounded-full border border-slate-700 object-cover" />
                             <div>
                                <h3 className="font-bold text-white text-sm line-clamp-1">{t.name}</h3>
                                <p className="text-xs text-slate-400">{t.role}</p>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => openTeamEdit(t)} className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition" title="Edit"><Pencil className="w-3 h-3"/></button>
                             <button onClick={() => handleDeleteTeam(t.id, t.name)} className="p-2 bg-red-950/40 text-red-400 rounded-lg hover:bg-red-900 transition" title="Delete"><Trash2 className="w-3 h-3"/></button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

           </div>

           {/* RIGHT COLUMN: Leads Pipeline */}
           <div className="xl:col-span-8">
              <div className="bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 md:p-10 backdrop-blur-xl min-h-full">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-2xl font-black text-white flex items-center gap-3">
                       Client Inquiries Pipeline
                       <span className="bg-accent-dark text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                         {leads.length} Active
                       </span>
                    </h2>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {leads.length === 0 ? (
                       <div className="py-24 text-center text-slate-500 font-bold bg-slate-950/40 rounded-3xl border border-slate-800/50 border-dashed text-sm flex flex-col items-center gap-4">
                         <Mail className="w-10 h-10 opacity-20" /> No incoming inquiries at the moment.
                       </div>
                    ) : (
                      leads.map(lead => (
                        <div key={lead.id} className="bg-slate-950/60 p-6 md:p-8 rounded-3xl border border-slate-800/50 flex flex-col gap-6 relative overflow-hidden group hover:border-slate-700/80 transition-colors">
                           <div className="flex flex-col sm:flex-row justify-between items-start gap-4 z-10 relative">
                              <div>
                                 <h3 className="font-black text-2xl text-white mb-2">{lead.name}</h3>
                                 <div className="flex flex-wrap gap-4">
                                    <a href={`mailto:${lead.email}`} className="text-accent-light text-sm flex items-center gap-1.5 hover:underline font-medium"><Mail className="w-4 h-4 opacity-50"/> {lead.email}</a>
                                    <a href={`tel:${lead.phone}`} className="text-accent-light text-sm flex items-center gap-1.5 hover:underline font-medium"><Phone className="w-4 h-4 opacity-50"/> {lead.phone}</a>
                                 </div>
                              </div>
                              <div className={`px-4 py-1.5 text-xs font-bold rounded-lg border uppercase tracking-widest ${lead.status === 'PROCESSED' ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                                 {lead.status || 'NEW'}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-slate-800/60 z-10 relative">
                              <div className="flex items-center gap-3 text-sm text-slate-300 font-bold bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                                <DollarSign className="w-5 h-5 text-emerald-400"/> {lead.budget}
                              </div>
                              <div className="flex items-center gap-3 text-sm text-slate-300 font-bold bg-slate-900/50 p-4 rounded-2xl border border-slate-800/50">
                                <Clock className="w-5 h-5 text-orange-400"/> {lead.timeline}
                              </div>
                           </div>

                           <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/30 z-10 relative">
                              <div className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Project Specification</div>
                              <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{lead.description}</p>
                           </div>

                           <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 z-10 relative">
                              <button onClick={() => deleteLead(lead.id, lead.name)} className="px-5 py-3 bg-slate-900 text-red-400 hover:bg-red-500 hover:text-white text-sm font-bold rounded-xl transition-all border border-slate-800 flex items-center justify-center gap-2">
                                <Trash2 className="w-4 h-4"/> Delete Log
                              </button>
                              {lead.status !== 'PROCESSED' && (
                                <button onClick={() => markProcessed(lead.id)} className="px-5 py-3 bg-accent-dark text-white hover:bg-accent-light hover:text-slate-900 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                                  <CheckCircle className="w-4 h-4"/> Mark as Processed
                                </button>
                              )}
                           </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* CRUD MODALS */}
      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-[100] bg-[#070b14]/90 backdrop-blur-xl flex items-center justify-center p-4">
           <form onSubmit={handleSaveProject} className="bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-800 shadow-2xl flex flex-col">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                <h3 className="font-bold text-xl text-white">{editingProject ? "Edit Project" : "New Project"}</h3>
                <button type="button" onClick={() => setShowProjectModal(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                    <input required defaultValue={editingProject?.title} name="title" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                    <textarea required defaultValue={editingProject?.description} name="description" rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light resize-none" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Live URL</label>
                    <input required defaultValue={editingProject?.url} name="url" type="url" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tags (Comma Sep)</label>
                    <input required defaultValue={editingProject?.tags?.join(", ")} name="tags" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light" />
                 </div>

                 {editingProject?.imageUrl && (
                    <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                      <img src={editingProject.imageUrl} className="w-16 h-12 rounded-lg border border-slate-700 object-cover" />
                      <div>
                        <p className="text-sm font-bold text-white">Current Preview Preserved</p>
                        <p className="text-xs text-slate-500">Only upload below if replacing thumbnail.</p>
                      </div>
                    </div>
                 )}

                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Website Screenshot</label>
                    <div className="w-full relative bg-slate-950/50 border border-slate-800 border-dashed rounded-2xl px-4 py-10 text-center hover:bg-slate-900 transition-colors cursor-pointer group overflow-hidden">
                       {projectImagePreview ? (
                         <div className="absolute inset-0 p-2 flex items-center justify-center">
                           <img src={projectImagePreview} className="w-full h-full object-contain rounded-xl" />
                         </div>
                       ) : (
                         <>
                           <Upload className="w-6 h-6 text-slate-600 mx-auto mb-3 group-hover:text-accent-light transition-colors" />
                           <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">Select screenshot from computer</span>
                         </>
                       )}
                       <input 
                         name="image" 
                         type="file" 
                         accept="image/*" 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                         required={!editingProject && !editingProject?.imageUrl}
                         onChange={(e) => {
                           if (e.target.files?.[0]) setProjectImagePreview(URL.createObjectURL(e.target.files[0]));
                         }}
                       />
                    </div>
                 </div>

              </div>
              <div className="p-6 border-t border-slate-800/50 flex justify-end gap-3">
                <button type="button" onClick={() => setShowProjectModal(false)} className="px-6 py-3 font-bold text-slate-400 hover:text-white transition">Cancel</button>
                <button disabled={isSubmitting} type="submit" className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-brand-50 disabled:opacity-50 transition-colors shadow-lg">
                  {isSubmitting ? "Syncing..." : "Publish Data"}
                </button>
              </div>
           </form>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-[100] bg-[#070b14]/90 backdrop-blur-xl flex items-center justify-center p-4">
           <form onSubmit={handleSaveTeam} className="bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-800 shadow-2xl flex flex-col">
              <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                <h3 className="font-bold text-xl text-white">{editingTeam ? "Modify Member" : "New Member"}</h3>
                <button type="button" onClick={() => setShowTeamModal(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400"/></button>
              </div>
              <div className="p-6 flex flex-col gap-5">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                    <input required defaultValue={editingTeam?.name} name="name" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Role Label</label>
                    <input required defaultValue={editingTeam?.role} name="role" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Short Bio / Description</label>
                    <textarea required defaultValue={editingTeam?.description} name="description" rows={2} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-light resize-none" />
                 </div>
                 
                 {editingTeam && (
                    <div className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                      <img src={editingTeam.imageUrl} className="w-12 h-12 rounded-full border border-slate-700 object-cover" />
                      <div>
                        <p className="text-sm font-bold text-white">Current Graphic Preserved</p>
                        <p className="text-xs text-slate-500">Only upload below if replacing avatar.</p>
                      </div>
                    </div>
                 )}

                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{editingTeam ? "Upload Override" : "Upload File Limit 4MB"}</label>
                    <div className="w-full relative bg-slate-950/50 border border-slate-800 border-dashed rounded-2xl px-4 py-10 text-center hover:bg-slate-900 transition-colors cursor-pointer group overflow-hidden">
                       {imagePreview ? (
                         <div className="absolute inset-0 p-2 flex items-center justify-center">
                           <img src={imagePreview} className="w-full h-full object-contain rounded-xl" />
                         </div>
                       ) : (
                         <>
                           <Upload className="w-6 h-6 text-slate-600 mx-auto mb-3 group-hover:text-accent-light transition-colors" />
                           <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">Select image from computer</span>
                         </>
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
              <div className="p-6 border-t border-slate-800/50 flex justify-end gap-3">
                <button type="button" onClick={() => setShowTeamModal(false)} className="px-6 py-3 font-bold text-slate-400 hover:text-white transition">Cancel</button>
                <button disabled={isSubmitting} type="submit" className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-brand-50 disabled:opacity-50 transition-colors shadow-lg">
                  {isSubmitting ? "Uploading..." : "Publish Data"}
                </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
}
