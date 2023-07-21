 
import './App.css'; 
 import SideMenu from './Components/layout/SideMenu'; 
// import PageContent from './Components/layout/PageContent';
import { Layout, Space } from 'antd';
import PageContent from './Components/layout/PageContent/index';
const {  Sider, Content } = Layout;
 
const contentStyle = { 
  minHeight: 120,   
};
const siderStyle = { 
  lineHeight: '120px',
  color: '#fff', 
};
 
const App = () => (
  <Space
    direction="vertical"
    style={{ width: '100%' }}
    size={[0, 48]}
  >
     
    <Layout>
      <Sider style={siderStyle}>
        <SideMenu/>
      </Sider>
      <Layout> 
        <Content style={contentStyle}>
          <PageContent/>  
        </Content> 
      </Layout>
    </Layout>
  </Space>
)
export default App;
