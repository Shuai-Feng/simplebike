import React from 'react';
import {Card,Button,Modal} from 'antd';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftjs from 'draftjs-to-html';
export default class Rich extends React.Component {
    state = {
        editState:EditorState.createEmpty()
    }
    state = {
        showRichText:false,
        editorContent: '',
        editorState: '',
    };
    handleClearContent = ()=>{
        this.setState({
            editorState:''
        })
    }
    handleGetText = ()=>{
        this.setState({
            showRichText:true
        })
        console.log(this.state.cotentState)
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };
    onEditorChange = (cotentState)=>{
        this.setState({
            cotentState
        })
    }
    render(){
        const {editorState} = this.state;
        return (
            <div>
                <Card>
                    <Button onClick={this.handleClearContent} style={{marginRight:10}} >清空内容</Button>
                    <Button onClick={this.handleGetText}>查看内容</Button>
                </Card>
                <Card title="富文本编辑框" style={{height:500}}>
                <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                >
                    {
                        
                    draftjs(this.state.cotentState)
                    }
                </Modal>
            </div>
        )
    }
}
