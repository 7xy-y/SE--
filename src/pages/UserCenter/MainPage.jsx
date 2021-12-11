import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import TagPicture from './TagPicture'
import MissionList from './MissionList'
import UploadPics from './UploadPics'
import Upone from './uploadFile'
import PictureMark from './TagPicture';
import MyMission from './MyMission'

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


class UserCenter extends React.Component {
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
          <br/> <span style={{ color: '#fff', fontSize: '1.4em', marginLeft: 20 }}>图片标注系统</span><br/><br/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            
          <Menu.Item key="1"  icon={<SmileOutlined />}>领取任务
            <Link to={{ pathname: '/UserCenter/MissionList', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
              视频、图片上传
            <Link to={{ pathname: '/UserCenter/Upone', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
            </Menu.Item>
              
            <Menu.Item key="3" icon={<CloudOutlined />}>
              图片批量上传
              <Link to={{ pathname: '/UserCenter/UploadPics', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
            </Menu.Item>

            <Menu.Item key="4"  icon={<FileTextOutlined />}>我的任务
              <Link to={{ pathname: '/UserCenter/MyMission', state: { username: this.state.username, psw: this.state.psw, mission_ID:this.state.mission_ID,file:this.state.file } }}></Link>
              </Menu.Item>

          </Menu>
        </Sider>


        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background"  style={{ padding: 20 }} >
            <span style={{ color: '#fff', fontSize: '1.4em', float:'right' }}>当前用户：{this.state.username}</span>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Switch>
                <Route path="/UserCenter/MissionList" component={MissionList}></Route>
                <Route path="/UserCenter/TagPicture" component={TagPicture}></Route>
                <Route path="/UserCenter/UploadPics" component={UploadPics}></Route>
                <Route path="/UserCenter/Upone" component={Upone}></Route>
                <Route path="/UserCenter/PictureMark" component={PictureMark}></Route>
                <Route path="/UserCenter/MyMission" component={MyMission}></Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout >
    )
  }


}
export default UserCenter;
