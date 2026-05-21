"use client";

import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, Shield, Save, CheckCircle, Camera, Edit, X } from 'lucide-react';
import { useGuardianAuth } from '@/lib/GuardianAuthContext';
import { cn } from '@/lib/utils';
import { compressImage } from '@/lib/storage-utils';

export default function GuardianProfileView() {
  const { currentGuardian, updateGuardian } = useGuardianAuth();
  const photoRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>(currentGuardian?.profilePhoto ?? '');
  const [photoSaving, setPhotoSaving] = useState(false);
  const [photoSaved, setPhotoSaved]   = useState(false);

  if (!currentGuardian) return null;

  // Sync form values whenever currentGuardian changes
  useEffect(() => {
    if (nameRef.current) nameRef.current.value = currentGuardian.name;
    if (emailRef.current) emailRef.current.value = currentGuardian.email;
    if (phoneRef.current) phoneRef.current.value = currentGuardian.phone;
    setPhotoPreview(currentGuardian.profilePhoto ?? '');
  }, [currentGuardian]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      setPhotoSaving(true);

      try {
        const compressed = await compressImage(dataUrl, 300, 0.6);
        updateGuardian({ ...currentGuardian, profilePhoto: compressed });
        setPhotoSaved(true);
        setTimeout(() => setPhotoSaved(false), 2000);
      } catch (err) {
        console.error('Photo upload failed:', err);
      } finally {
        setPhotoSaving(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const updatedGuardian = {
      ...currentGuardian,
      name: nameRef.current?.value || currentGuardian.name,
      email: emailRef.current?.value || currentGuardian.email,
      phone: phoneRef.current?.value || currentGuardian.phone,
    };

    setTimeout(() => {
      updateGuardian(updatedGuardian);
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-text-main uppercase tracking-tight">Guardian Profile</h3>
        {(isSaved || photoSaved) && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100 animate-in zoom-in-95">
            <CheckCircle size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Changes Saved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border text-center">
            <div className="relative inline-block mx-auto mb-6">
              <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden group">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-brand-primary" />
                )}
                
                <button 
                  onClick={() => photoRef.current?.click()}
                  disabled={photoSaving}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                >
                  <Camera size={24} className="text-white" />
                </button>

                {photoSaving && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => photoRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-lg border-4 border-white hover:bg-brand-secondary transition-all"
              >
                <Edit size={16} />
              </button>
            </div>
            
            <input 
              type="file" 
              ref={photoRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoChange} 
            />

            <h4 className="text-xl font-black text-text-main uppercase tracking-tight">{currentGuardian.name}</h4>
            <p className="text-xs text-text-muted font-bold mt-1">{currentGuardian.email}</p>
            
            <div className="mt-8 pt-8 border-t border-ui-border flex justify-around">
              <div className="text-center">
                <p className="text-lg font-black text-text-main">{currentGuardian.children.length}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Linked Children</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-text-main">Verified</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
              </div>
            </div>
          </div>

          <div className="bg-ui-bg rounded-3xl p-6 border border-ui-border">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={18} className="text-brand-primary" />
              <h5 className="text-xs font-black text-text-main uppercase tracking-widest">Account Security</h5>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
              Your account is secured with end-to-end encryption. Last login from Dhaka, Bangladesh.
            </p>
            <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">
              Change Password
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-ui-border">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      ref={nameRef}
                      defaultValue={currentGuardian.name}
                      className="w-full pl-12 pr-4 py-4 bg-ui-bg border border-ui-border rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="email" 
                      ref={emailRef}
                      defaultValue={currentGuardian.email}
                      className="w-full pl-12 pr-4 py-4 bg-ui-bg border border-ui-border rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel" 
                      ref={phoneRef}
                      defaultValue={currentGuardian.phone}
                      className="w-full pl-12 pr-4 py-4 bg-ui-bg border border-ui-border rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-ui-border flex justify-end">
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
