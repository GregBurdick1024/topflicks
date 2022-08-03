import React, { useEffect } from 'react'
import { Layout, Menu, Button, Dropdown } from 'antd'
import './App.css';
import HomePage from './components/HomePage'
import FilmDetails from './components/FilmDetails';
import { UserOutlined } from '@ant-design/icons'
import {
  Route,
  Link,
  Redirect,
  Routes,
} from 'react-router-dom'
import styles from './app.module.css'


const { Header, Footer, Content, Sider } = Layout

const App = () => {
  
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        {/* <Link to={`/toplists/${user.id}/${user.username}`}>Top Lists</Link> */}
      </Menu.Item>
      <Menu.Item key='1'>
        {/* <Link to={`/myfilms/${user.id}/${user.username}`}>My Films</Link> */}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>Logout</Menu.Item>
    </Menu>
  )
  
  
  
  return (
    <div className="App">
      <Header>
        {<Link to=''>
          <div className={styles.logo}>TopFlicks</div>
        </Link>}
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>
            <Link to='/login'>Login</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            {/* {user ? ( */}
              <Dropdown.Button
                icon={<UserOutlined />}
                overlay={menu}
                trigger={['click']}
              >
                {/* <Link className='ant-dropdown-link' to=''>
                  { {user.username} }
                </Link> */}
              </Dropdown.Button>
            {/* ) : null} */}
          </Menu.Item>
          <Menu.Item key='3'></Menu.Item>
        </Menu>
      </Header>
      <Routes>
        {/* <Route path='/newlist' children={<NewListPage />} />
        <Route path='/myfilms/:id/:user' children={<MyFilmsPage favorites={favorites} user={user} />} />
        <Route
          path='/login'
          children={
            user ? (
              <Redirect to='/' />
            ) : (
                <LoginPage
                  user={user}
                  setUser={setUser}
                  setErrorMessage={setErrorMessage}
                />
              )
          }
        />
        <Route path='/toplists/:id/:user/:list' element={<ListPage user={user} />} />
        <Route path='/toplists/:id/:user' element={<TopListsPage user={user} topLists={topLists} />} />
        <Route path='/search/:film' element={<SearchPage searchResults={searchResults} setSearchResults={setSearchResults} />} />*/}
        <Route path='/film/:id' element={<FilmDetails />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer>Footer</Footer>
    </div>
  );
}

export default App;
