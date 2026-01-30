import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomeLayout } from '@/layouts/HomeLayout';
import { Home } from '@/pages/Home';
import { SkillDetail } from '@/pages/SkillDetail';
import { Guide } from '@/pages/Guide';
import { FAQ } from '@/pages/FAQ';
import { Charts } from '@/pages/Charts';
import { About } from '@/pages/About';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { MessageProvider } from '@/components/feedback/Message';
import { DocumentCenterLayout } from '@/pages/DocumentCenter';
import { DocumentContent } from '@/pages/DocumentCenter/DocumentContent';

import { HelpCenterPage } from '@/pages/HelpCenter';
import { AnnotationProvider } from '@/contexts/AnnotationContext';



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
            <Route path="/skill/:id" element={<SkillDetail />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </MessageProvider>
    </AnnotationProvider>
  );
}

export default App;
