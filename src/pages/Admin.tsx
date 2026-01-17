import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex pt-24 pb-20 md:pb-0">
      {/* Sidebar - Desktop */}
      <div className="w-64 bg-zinc-950 border-r border-white/10 hidden md:flex flex-col fixed z-10 left-0 top-24 bottom-0">
        <div className="p-6 flex-1">
          <h2 className="text-gold-400 font-serif text-xl mb-2">Admin Panel</h2>
          <p className="text-xs text-cream-200/50 mb-8 truncate">{user?.email}</p>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id
                  ? 'bg-gold-500 text-brown-900 font-bold'
                  : 'text-cream-200 hover:bg-brown-800'
                  }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-gold-500/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/20 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

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
      <div className="flex-1 md:ml-64 p-8 overflow-y-auto pb-24">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'inquiries' && <InquiryManager />}
          {activeTab === 'menu' && <MenuManager />}
          {activeTab === 'art' && <ArtManager />}
          {activeTab === 'seeds' && <SeedsManager />}
          {activeTab === 'workshops' && <WorkshopManager />}
        </motion.div>
      </div>
    </div>
  );
}

const DashboardView = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {['Total Sales', 'Active Orders', 'New Customers'].map((stat, i) => (
      <div key={i} className="bg-brown-900 p-6 rounded-xl border border-gold-500/20">
        <h3 className="text-cream-200/60 mb-2">{stat}</h3>
        <p className="text-3xl font-serif text-gold-400 font-bold">1,234</p>
      </div>
    ))}
    <div className="col-span-1 md:col-span-3 bg-brown-900/50 p-8 rounded-xl border border-gold-500/10 mt-8">
      <h3 className="text-2xl font-serif text-cream-100 mb-4">Welcome Back, Admin</h3>
      <p className="text-cream-200/80">
        Use the sidebar to manage your cafe's content. You can add new menu items,
        curate the art gallery, and schedule workshops directly from this panel.
      </p>
    </div>
  </div>
);
