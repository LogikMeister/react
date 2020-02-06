import React from 'react';
import ReactDom from 'react-dom';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App(){
    return (
        <Layout>
            <Header>123</Header>
            <Content>12334</Content>
            <Footer>1236</Footer>
        </Layout>
    )
}

ReactDom.render(
    <App />,
    document.getElementById('root')
)