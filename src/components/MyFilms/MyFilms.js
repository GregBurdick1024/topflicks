import { Layout } from 'antd'
import TaggedTable from '../Lists/TaggedTable'

const { Content } = Layout
const MyFilmsPage = () => {

  return (
	<Content className='container'>
		<h1>My Films</h1>
		<TaggedTable/>
	</Content>
  )
}

export default MyFilmsPage
