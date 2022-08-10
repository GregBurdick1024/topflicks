import React, { useEffect } from 'react'
import { Layout, Menu, Button, Dropdown } from 'antd'
import './style.css';
import HomePage from '../Homepage/HomePage'
import FilmDetails from '../Details/FilmDetails';
import Login from '../Login/Login'
import { UserOutlined } from '@ant-design/icons'
import {
	Route,
	Link,
	Navigate,
	Routes,
	useNavigate,
} from 'react-router-dom'
import styles from './app.module.css'
import { useDispatch, useSelector } from 'react-redux';
import userService from '../services/userService';
import { setUser, logout } from '../reducers/userReducer';


const { Header, Footer, Content, Sider } = Layout

const App = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(({ user }) => user.details)
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			userService.setToken(user.token)
		}
	  }, [])


	const handleLogOut = () => {
		dispatch(logout())
		window.localStorage.clear()
		navigate("/", { replace: true })
	}
  
	const menu = (
	<Menu>
		<Menu.Item key='0'>
		{/* <Link to={`/toplists/${user.id}/${user.username}`}>Top Lists</Link> */}
		</Menu.Item>
		<Menu.Item key='1'>
		{/* <Link to={`/myfilms/${user.id}/${user.username}`}>My Films</Link> */}
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key='3'onClick={handleLogOut}>Log out</Menu.Item>
	</Menu>
	)
  
  
  
	return (
	<div className="App">
		<Header>
		{<Link to='/'>
			<div className={styles.logo}>TopFlicks</div>
		</Link>}
		<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
			<Menu.Item key='1'>
			{user ? null : <Link to='/login'>Login</Link>}
			</Menu.Item>
			<Menu.Item key='2'>
			{user ? (
				<Dropdown.Button
				icon={<UserOutlined />}
				overlay={menu}
				trigger={['click']}
				>
				<Link className='ant-dropdown-link' to=''>
					{user.username}
				</Link>
				</Dropdown.Button>
			) : null}
			</Menu.Item>
			<Menu.Item key='3'></Menu.Item>
		</Menu>
		</Header>
		<Routes>
			{/*<Route path='/newlist' children={<NewListPage />} /> */}
			{/* <Route path='/myfilms/:id/:user' children={<MyFilmsPage favorites={favorites} user={user} />} /> */}
			<Route
				path='/login'
				element={
					user 
					? <Navigate to='/' />
					: <Login/>
				}
			/>
			{/* <Route path='/toplists/:id/:user/:list' element={<ListPage user={user} />} />
			<Route path='/toplists/:id/:user' element={<TopListsPage user={user} topLists={topLists} />} />
			<Route path='/search/:film' element={<SearchPage searchResults={searchResults} setSearchResults={setSearchResults} />} /> */}
			<Route path='/film/:id' element={<FilmDetails />} />
			<Route path='/' element={<HomePage />} />
		</Routes>
		<Footer>Footer</Footer>
	</div>
	);
}

export default App;
