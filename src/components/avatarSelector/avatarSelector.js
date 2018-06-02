import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    static propTypes = {
        selectAvatar: PropTypes.func
    }
    render() {
        const avatarList =
            'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                .split(',')
                .map(item => ({
                    icon: require(`../img/${item}.png`),
                    text: item
                }))
        const gridHeader = this.state.text ? (
            <div>
                <span style={{ marginRight: 10 }}>已选择头像</span>
                <img src={this.state.icon} alt="" style={{ width: 20 }} />
            </div>
        )
            : '请选择头像'
        return (
            <List renderHeader={() => gridHeader}>
                <Grid
                    data={avatarList}
                    columnNum={5}
                    onClick={elm => {
                        this.setState(elm)
                        this.props.selectAvatar(elm.text)
                    }}
                />
            </List>
        )
    }
}

export default AvatarSelector 