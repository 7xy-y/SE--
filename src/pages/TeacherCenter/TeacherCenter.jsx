import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import EditLesson from './EditLesson'
import MyClass from './MyClass'
import FindCourse from './FindCourse'
import TApplication from './TApplication'
import PictureMark from './PictureMark';


import {
  BarChartOutlined,
  FileTextOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
  HighlightOutlined,
  BookOutlined,
  CloudOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TeacherCenter extends React.Component {
  constructor(){
    super()
    this.state={
        username:"",
        psw:"",
        mission_ID:"",
        file:"",

    }

    console.log(this.props)
}


  componentWillMount(){
    var id = this.props.location.state.username;
    var passw = this.props.location.state.psw;
   console.log(this.props)
    this.setState({
        username: id,
        psw: passw,
        mission_ID: '',
        file:''
    });

    console.log(this.props)
}

  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <br/><br/><br/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            
          <Menu.Item key="1" icon={<TeamOutlined />}>
              任务发布
              <Link to={{ pathname: '/TeacherCenter/TApplication', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
            </Menu.Item>
              <Menu.Item key="2"  icon={<SmileOutlined />}>领取任务
              <Link to={{ pathname: '/TeacherCenter/MyClass', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
              </Menu.Item>
            <Menu.Item key="3" icon={<CloudOutlined />}>
              多任务？
              <Link to={{ pathname: '/TeacherCenter/FindCourse', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
            </Menu.Item>

          </Menu>
        </Sider>


        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <span style={{ color: '#fff', fontSize: '1.4em', marginLeft: 20 }}>图片标注系统</span>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Switch>
                <Route path="/TeacherCenter/MyClass" component={MyClass}></Route>
                <Route path="/TeacherCenter/EditLesson" component={EditLesson}></Route>
                <Route path="/TeacherCenter/FindCourse" component={FindCourse}></Route>
                <Route path="/TeacherCenter/TApplication" component={TApplication}></Route>
                <Route path="/TeacherCenter/PictureMark" component={PictureMark}></Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout >
    )
  }


}
export default TeacherCenter;
