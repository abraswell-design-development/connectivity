import React, {Component} from 'react'
import './NavButton.css'


export default class NavButton extends Component {
    render(){
        const { tag, className, children, ...otherProps } = this.props
        return React.createElement(          
            this.props.tag,
            {
                className: ['NavButton', this.props.className].join(' '),
                ...otherProps
            },
            this.props.children      
        )
    }
}

NavButton.defaultProps ={
    tag: 'a'
}

