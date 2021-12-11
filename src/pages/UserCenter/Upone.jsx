import React, { Component } from 'react'
import { Input, Select, Form, Button } from 'antd'
import { Popconfirm, message } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Upload from './uploadFile'

const path = require('path')

export default class Up extends Component {

    constructor()
    {
        super()
        this.state = {
            username: "",
            psw: "",
            mission_ID:"",
            file:"",
        }
        
        
    }

    componentWillMount(){
        //const output=path.parse('C:\Users\钱（名字可以自己改）\Desktop\新建文本文档.txt');
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
           <div classname="upload">
               <Upload/>
            </div>
        )
    }
}

