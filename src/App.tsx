import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Dashboard } from '@/pages/Dashboard';
import { GalleryLayout } from '@/pages/Gallery/Layout';
import { GalleryOverview } from '@/pages/Gallery/Overview';
import { AtomsGallery } from '@/pages/Gallery/Atoms';
import { MoleculesGallery } from '@/pages/Gallery/Molecules';
import { DataDisplayGallery } from '@/pages/Gallery/DataDisplay';
import { OrganismsGallery } from '@/pages/Gallery/Organisms';
import { LayoutsGallery } from '@/pages/Gallery/layouts';
import { ChartsGallery } from '@/pages/Gallery/Charts';
import { Home } from '@/pages/Home';
import { SkillEditor } from '@/pages/SkillEditor';
import { SkillDetail } from '@/pages/SkillDetail';
import { Guide } from '@/pages/Guide';
import { FAQ } from '@/pages/FAQ';
import { Charts } from '@/pages/Charts';
import { About } from '@/pages/About';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Profile } from '@/pages/Profile';
import { Settings } from '@/pages/Settings';
import { SkillReview } from '@/pages/Admin/SkillReview';
import { AdminCleanup } from '@/pages/Admin/Cleanup';
import { TenantListPage } from '@/pages/Tenants/TenantList';
import { TenantUsersPage } from '@/pages/Tenants/Users';
import { TenantRolesPage } from '@/pages/Tenants/Roles';
import { TenantOrgsPage } from '@/pages/Tenants/Orgs';
import { MessageProvider } from '@/components/feedback/Message';
import { DocumentCenterLayout } from '@/pages/DocumentCenter';
import { DocumentContent } from '@/pages/DocumentCenter/DocumentContent';

import { HelpCenterPage } from '@/pages/HelpCenter';
import { SettingsLayout } from '@/pages/SystemSettings/layouts/SettingsLayout';
import { AnnotationProvider } from '@/contexts/AnnotationContext';

// Wrapper for Dashboard Layout to keep Routes clean
const DashboardRoot = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

function App() {
  return (
    <AnnotationProvider>
      <MessageProvider>
        <Router>
          <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
          
          {/* Document Center Routes */}
          <Route path="/document-center" element={<DocumentCenterLayout />}>
            <Route index element={<Navigate to="intro" replace />} />
            <Route path=":docId" element={<DocumentContent />} />
          </Route>



          {/* Skills Share Routes (Top Navbar) */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/skill/create" element={<SkillEditor />} />
            <Route path="/skill/:id/edit" element={<SkillEditor />} />
            <Route path="/skill/:id" element={<SkillDetail />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/skills" element={<SkillReview />} />
            <Route path="/admin/cleanup" element={<AdminCleanup />} />
          </Route>

          {/* Main Application Routes (Sidebar) */}
          <Route element={<DashboardRoot />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Tenants Routes (Moved to SystemSettings independent layout) */}

            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />

            {/* Law Regulations Routes (Legacy/Alias) */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <h2 className="text-2xl font-bold mb-2">功能开发中</h2>
                <p>该模块正在建设中，敬请期待...</p>
              </div>
            } />
          </Route>

          {/* System Settings Routes */}
          <Route path="/SystemSettings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="/SystemSettings/list" replace />} />
            <Route path="list" element={<TenantListPage />} />
            <Route path="users" element={<TenantUsersPage />} />
            <Route path="roles" element={<TenantRolesPage />} />
            <Route path="orgs" element={<TenantOrgsPage />} />
          </Route>

          {/* Component Gallery Routes */}
          <Route path="/gallery" element={<GalleryLayout />}>
            <Route index element={<GalleryOverview />} />
            <Route path="atoms" element={<AtomsGallery />} />
            <Route path="molecules" element={<MoleculesGallery />} />
            <Route path="data-display" element={<DataDisplayGallery />} />
            <Route path="organisms" element={<OrganismsGallery />} />
            <Route path="layouts" element={<LayoutsGallery />} />
            <Route path="charts" element={<ChartsGallery />} />
          </Route>
        </Routes>
      </Router>
    </MessageProvider>
    </AnnotationProvider>
  );
}

export default App;
