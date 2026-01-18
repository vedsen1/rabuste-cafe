import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Coffee, Palette, GraduationCap, Sprout, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
;
import { WorkshopManager } from '../components/admin/WorkshopManager';
import { useNavigate } from 'react-router-dom';
import { MenuManager } from '@/components/admin/MenuManager';
import { ArtDetailsModal } from '@/components/modals/ArtDetailsModal';
import { ArtManager } from '@/components/admin/ArtManager';
import { SeedsManager } from '@/components/admin/SeedsManager';
import { InquiryManager } from '@/components/admin/InquiryManager';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'menu', label: 'Manage Menu', icon: Coffee },
  { id: 'art', label: 'Manage Art', icon: Palette },
  { id: 'seeds', label: 'Manage Seeds', icon: Sprout },
  { id: 'workshops', label: 'Workshops', icon: GraduationCap },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex pt-24 pb-20 md:pb-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brown-800/10 rounded-full blur-3xl" />
      </div>
      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-72 bg-zinc-950/80 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col fixed z-10 left-0 top-24 bottom-0 shadow-2xl"
      >
        <div className="p-8 flex-1">
          <div className="mb-10">
            <h2 className="text-gold-400 font-serif text-2xl mb-1 tracking-wide">Admin Panel</h2>
            <div className="h-px w-16 bg-gradient-to-r from-gold-400 to-transparent mb-3" />
            <p className="text-xs text-cream-200/50 truncate font-mono">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-brown-900 font-bold shadow-lg shadow-gold-500/20'
                    : 'text-cream-200/70 hover:text-cream-100 hover:bg-white/5'
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon size={20} className={`relative z-10 ${activeTab === tab.id ? 'stroke-[2.5px]' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="text-sm tracking-wider uppercase relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm tracking-wider uppercase">Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="bg-red-900 text-white p-4 rounded-full shadow-lg border border-red-500/50"
        >
          <LogOut size={24} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 p-6 md:p-10 relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto"
          >
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab !== 'dashboard' && (
              <div className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl">
                {activeTab === 'inquiries' && <InquiryManager />}
                {activeTab === 'menu' && <MenuManager />}
                {activeTab === 'art' && <ArtManager />}
                {activeTab === 'seeds' && <SeedsManager />}
                {activeTab === 'workshops' && <WorkshopManager />}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const DashboardView = () => (
  <div className="space-y-10">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-6"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-cream-100 mb-2 tracking-tight">Dashboard</h1>
        <p className="text-gold-400/70 text-sm tracking-widest uppercase font-bold">System Overview</p>
      </div>
      <div className="text-right">
        <p className="text-cream-200/40 text-sm font-mono">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Total Orders', value: '1,234', icon: Coffee, color: 'gold' },
        { label: 'Active Users', value: '567', icon: MessageSquare, color: 'green' },
        { label: 'Revenue', value: '₹45.2K', icon: LayoutDashboard, color: 'blue' }
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all group"
        >
          <div className="flex items-start justify-between mb-6">
            <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} strokeWidth={1.5} />
            </div>
            <span className="text-xs text-cream-200/30 font-mono">Live</span>
          </div>
          <h3 className="text-cream-200/50 text-xs uppercase tracking-widest font-bold mb-2">{stat.label}</h3>
          <p className="text-4xl font-serif font-bold text-cream-100 group-hover:text-gold-400 transition-colors">{stat.value}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl group-hover:bg-gold-400/10 transition-colors" />

      <div className="relative z-10">
        <h3 className="text-3xl font-serif text-cream-100 mb-6 tracking-wide">Welcome Back</h3>
        <p className="text-cream-200/60 leading-relaxed max-w-2xl text-lg mb-8">
          Manage your café's digital presence with precision. Update menus, curate art galleries,
          and monitor customer engagement—all from this centralized dashboard.
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="px-5 py-2 rounded-full border border-gold-400/20 text-gold-400/70 text-xs uppercase tracking-widest font-bold bg-gold-400/5">
            Secure Access
          </div>
          <div className="px-5 py-2 rounded-full border border-white/10 text-cream-200/40 text-xs uppercase tracking-widest font-bold">
            v2.4.0
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);
