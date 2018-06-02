import React from 'react';
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class UserCard extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func
    }
    handlerClick(item) {
        this.props.history.push(`/chat/${item._id}`)
    }
    render() {
        let timeStamp = Math.random()
        return (
            <WingBlank>
                {this.props.userList.map(item =>
                    (
                        item.avatar ? (
                            <Card
                                key={item.user}
                                onClick={() =>
                                    this.handlerClick(item)
                                }
                            >
                                <Card.Header
                                    title={item.user}
                                    thumb={require(`../img/${item.avatar}.png`)}
                                    extra={<span>{item.title}</span>}
                                >
                                </Card.Header>
                                <Card.Body>
                                    {item.type === 'boss' ? <div>公司:{item.company}</div> : null}
                                    {item.desc.split('\n').map(descItem => (<div key={`${timeStamp}${descItem}`}>{descItem}</div>))}
                                    {item.type === 'boss' ? <div>薪资:{item.money}</div> : null}
                                </Card.Body>
                            </Card>
                        ) : null
                    )
                )}
            </WingBlank>
        )
    }
}
export default UserCard