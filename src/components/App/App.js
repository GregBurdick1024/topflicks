import React, { useEffect } from 'react'
import { Layout, Menu, Button, Dropdown, Breadcrumb } from 'antd'
import './style.css';
import HomePage from '../Homepage/HomePage'
import FilmDetails from '../Details/FilmDetails';
import Login from '../Login/Login'
import MyFilms from '../MyFilms/MyFilms'
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
import { logout, initialiseUser } from '../reducers/userReducer';


const { Header, Footer } = Layout

const App = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(({ user }) => user.details)
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(initialiseUser(user))
			
		}
	  }, [])


	const handleLogOut = () => {
		dispatch(logout())
		window.localStorage.clear()
		navigate("/", { replace: true })
	}
  
	const menu = (
	<Menu>
		<Menu.Item key='1'onClick={handleLogOut}>Log out</Menu.Item>
	</Menu>
	)
  
  
  
	return (
	<Layout className="App">
		<Header>
			<div className={styles.logo}>TopFlicks</div>
			<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['0']}className={styles.menu}>
				<Menu.Item className={styles.menuItem}key='3'>
					{user ? <Link to={`/myfilms/${user.id}/${user.username}`}>My Favourites</Link> : null}
				</Menu.Item>
          		
          		<Menu.Item key='2'>
            		{user ? (
              			<Dropdown.Button
							icon={<UserOutlined className={styles.icon}/>}
							trigger={['click']}
							overlay={menu}
						>
							<Link className='ant-dropdown-link' to='/'>
								{user.username}
							</Link>
              			</Dropdown.Button>
            		) : 
					<Dropdown.Button
						icon={<UserOutlined />}
						trigger={['click']}
					>
						<Link to='/login'>Login</Link>
              		</Dropdown.Button>}
          		</Menu.Item>
        	</Menu>
		</Header>
		<Routes>
			{/*<Route path='/newlist' children={<NewListPage />} /> */}
			<Route path='/myfilms/:id/:user' element={<MyFilms />} />
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
	</Layout>
	);
}

export default App;
