import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const sections = [
  'Projects',
  'Ideas',
  'Characterization',
  'Initial Drafts',
  'Script',
  'Storyboarding',
  'Shot Lists',
  'Call sheets',
  'Schedule',
  'Team',
  'Resources',
];

const MIN_SIDEBAR_WIDTH = 180;
const MAX_SIDEBAR_WIDTH = 400;

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-family: 'Courier New', monospace;
  font-size: 16pt;
  transition: ${props => props.theme.transition};
`;

const Sidebar = styled.nav`
  width: ${props => props.width}px;
  background: ${props => props.theme.sidebar};
  padding: 2rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 100vh;
  font-family: 'Courier New', monospace;
  font-size: 16pt;
  transition: width 0.2s cubic-bezier(.4,0,.2,1);
  @media (max-width: 800px) {
    width: 70px !important;
    padding: 1rem 0.5rem;
    span { display: none; }
  }
`;

const DragHandle = styled.div`
  width: 6px;
  cursor: ew-resize;
  background: #e0e0e0;
  border-radius: 3px;
  margin-right: -3px;
  margin-left: -3px;
  z-index: 10;
  transition: background 0.2s;
  &:hover, &.dragging {
    background: #bdbdbd;
  }
`;

const AppName = styled.h2`
  color: ${props => props.theme.primary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  letter-spacing: 2px;
  font-family: 'Courier New', monospace;
  font-size: 16pt;
`;

const AddSectionBtn = styled(motion.button)`
  background: #000;
  color: #fff;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 1.2rem 2rem;
  font-size: 18pt;
  font-weight: 900;
  letter-spacing: 2px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  box-shadow: 0 4px 16px #0002;
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: ${props => props.theme.primary};
    color: #fff;
    border: 2px solid ${props => props.theme.primary};
  }
`;

const SidebarItem = styled(motion.div)`
  color: #c7c7c7;
  font-size: 16pt;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.2rem;
  cursor: pointer;
  background: ${props => (props.active ? props.theme.card : 'none')};
  font-weight: ${props => (props.active ? 700 : 400)};
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: 'Courier New', monospace;
  &:hover {
    background: ${props => props.theme.card};
    color: #fff;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2.5rem 2rem 2rem 2rem;
  background: ${props => props.theme.background};
  min-width: 0;
  font-family: 'Courier New', monospace;
  font-size: 16pt;
  @media (max-width: 800px) {
    padding: 1rem 0.5rem;
  }
`;

const Greeting = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  font-family: 'Courier New', monospace;
  font-size: 16pt;
`;

const SubGreeting = styled.p`
  color: ${props => props.theme.secondary};
  margin-bottom: 2.5rem;
  font-family: 'Courier New', monospace;
  font-size: 16pt;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
  font-family: 'Courier New', monospace;
  font-size: 16pt;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.card};
  color: ${props => props.theme.text};
  border-radius: 10px;
  padding: 1.2rem 1rem;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  font-family: 'Courier New', monospace;
  font-size: 16pt;
`;

// Placeholder components for each section
const SectionComponent = ({ section }) => {
  switch (section) {
    case 'Projects':
      return <Card>Project management coming soon...</Card>;
    case 'Ideas':
      return <Card>Brainstorm and save your film ideas here!</Card>;
    case 'Characterization':
      return <Card>Character profiles and arcs will be managed here.</Card>;
    case 'Initial Drafts':
      return <Card>Upload or create your first drafts here.</Card>;
    case 'Script':
      return <Card>Script writing and editing tools coming soon.</Card>;
    case 'Storyboarding':
      return <Card>Visualize your storyboards here.</Card>;
    case 'Shot Lists':
      return <Card>Organize your shot lists for each scene.</Card>;
    case 'Call sheets':
      return <Card>Manage call sheets for your crew and cast.</Card>;
    case 'Schedule':
      return <Card>Plan your production schedule here.</Card>;
    case 'Team':
      return <Card>Add and manage your filmmaking team.</Card>;
    case 'Resources':
      return <Card>Store and access important resources here.</Card>;
    default:
      return <Card>Section coming soon...</Card>;
  }
};

const Dashboard = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('Projects');
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(null);
  const dragStartWidth = useRef(null);

  const handleDragStart = (e) => {
    setDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = sidebarWidth;
    document.body.style.cursor = 'ew-resize';
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX.current;
    let newWidth = dragStartWidth.current + dx;
    if (newWidth < MIN_SIDEBAR_WIDTH) newWidth = MIN_SIDEBAR_WIDTH;
    if (newWidth > MAX_SIDEBAR_WIDTH) newWidth = MAX_SIDEBAR_WIDTH;
    setSidebarWidth(newWidth);
  };

  const handleDragEnd = () => {
    setDragging(false);
    document.body.style.cursor = '';
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [dragging]);

  return (
    <DashboardContainer theme={theme}>
      <Sidebar theme={theme} width={sidebarWidth}>
        <AppName theme={theme}>sweet</AppName>
        <AddSectionBtn
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          + Add New Section
        </AddSectionBtn>
        {sections.map(section => (
          <SidebarItem
            key={section}
            active={activeSection === section}
            onClick={() => setActiveSection(section)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{section}</span>
          </SidebarItem>
        ))}
      </Sidebar>
      <DragHandle
        className={dragging ? 'dragging' : ''}
        onMouseDown={handleDragStart}
        style={{ height: '100vh' }}
      />
      <MainContent theme={theme}>
        <Greeting>Good afternoon, Director</Greeting>
        <SubGreeting>Welcome back! Here's your filmmaking dashboard.</SubGreeting>
        <SectionTitle>{activeSection}</SectionTitle>
        <CardGrid>
          <SectionComponent section={activeSection} />
        </CardGrid>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard; 