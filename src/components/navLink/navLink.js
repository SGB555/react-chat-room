import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends React.Component {
    static proptypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(item => !item.hide);
        const pathName = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map(
                        item =>
                            <TabBar.Item
                                badge={item.path === '/message' ? this.props.unread : 0}
                                key={item.path}
                                title={item.text}
                                icon={{ uri: require(`../dashboard/navimg/${item.icon}.png`) }}
                                selectedIcon={{ uri: require(`../dashboard/navimg/${item.icon}-active.png`) }}
                                selected={pathName === item.path}
                                onPress={() => {
                                    this.props.history.push(item.path)
                                }}
                            >
                            </TabBar.Item>
                    )
                }

            </TabBar>
        )
    }
}

export default NavLinkBar