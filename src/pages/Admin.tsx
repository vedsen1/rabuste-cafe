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
    <div className="min-h-screen flex pt-24 pb-20 md:pb-0 bg-brown-950">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brown-900/20 rounded-full blur-3xl" />
      </div>
      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-72 bg-brown-900 backdrop-blur-xl border-r border-brown-800 hidden md:flex flex-col fixed z-10 left-0 top-24 bottom-0 shadow-2xl"
      >
        <div className="p-8 flex-1">
          <div className="mb-10">
            <h2 className="text-cream-100 font-serif text-2xl mb-1 tracking-wide">Admin Panel</h2>
            <div className="h-px w-16 bg-cream-200/20 mb-3" />
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
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-lg transition-all duration-300 group relative overflow-hidden ${activeTab === tab.id
                    ? 'bg-gold-500 text-brown-900 font-bold shadow-lg'
                    : 'text-cream-200/70 hover:text-cream-100 hover:bg-brown-800'
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gold-500 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon size={20} className={`relative z-10 ${activeTab === tab.id ? 'stroke-[2.5px]' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="text-sm tracking-wider uppercase relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-brown-800 bg-brown-900">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-lg text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all group border border-red-500/20"
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
      <main className="flex-1 md:ml-72 p-6 md:p-12 relative z-0">
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
              <div className="bg-brown-900 backdrop-blur-xl rounded-2xl border border-brown-800 p-8 md:p-12 shadow-2xl">
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
        <h1 className="text-4xl md:text-5xl font-serif text-gold-400 mb-2 tracking-tight">Dashboard</h1>
        <p className="text-gold-400/80 text-sm tracking-widest uppercase font-semibold">Café Management System</p>
      </div>
      <div className="text-right">
        <p className="text-cream-200/50 text-sm font-mono">
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
        { label: 'Total Orders', value: '1,234', icon: Coffee },
        { label: 'Active Users', value: '567', icon: MessageSquare },
        { label: 'Revenue', value: '₹45.2K', icon: LayoutDashboard }
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-brown-800 p-8 rounded-lg border border-brown-700 shadow-lg hover:shadow-xl transition-all group"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="p-3 rounded-lg bg-brown-700 text-cream-200 group-hover:scale-110 transition-transform">
              <stat.icon size={24} strokeWidth={1.5} />
            </div>
            <span className="text-xs text-cream-200/40 font-mono">Live</span>
          </div>
          <h3 className="text-cream-200/60 text-xs uppercase tracking-widest font-semibold mb-3">{stat.label}</h3>
          <p className="text-4xl font-serif font-bold text-cream-100">{stat.value}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-brown-800 p-10 md:p-14 rounded-lg border border-brown-700 shadow-xl relative overflow-hidden"
    >
      <div className="relative z-10">
        <h3 className="text-3xl font-serif text-cream-100 mb-4 tracking-wide">Welcome Back</h3>
        <p className="text-cream-200/70 leading-relaxed max-w-3xl text-base mb-8">
          Manage your café's digital presence with precision. Update menus, curate art galleries,
          organize workshops, and monitor customer inquiries—all from this centralized control center.
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="px-5 py-2.5 rounded-lg border border-brown-700 text-cream-200/70 text-xs uppercase tracking-widest font-semibold">
            Secure Access
          </div>
          <div className="px-5 py-2.5 rounded-lg border border-brown-700 text-cream-200/60 text-xs uppercase tracking-widest font-semibold">
            v2.4.0
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);
