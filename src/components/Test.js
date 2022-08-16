import { List } from 'antd'

const TestTable = () => {

    const favourites = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ]

    return (
        
        <List
        dataSource={favourites} 
        itemLayout={"horizontal"}
        renderItem={(item) => (
        <List.Item>
            <List.Item.Meta 
                avatar={<h3>hi</h3>}
                title={<h2>{item.title}</h2>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />

        </List.Item>
        )}
    />
    )
}

export default TestTable