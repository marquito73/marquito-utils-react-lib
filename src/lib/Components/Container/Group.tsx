import React from "react";
import { Component, ComponentProps } from "../Component/Component";


// TODO Voir pour faire une liste de scripts a placer qui s'exécuteront
export interface GroupProps extends ComponentProps {
    Childrens: Array<ComponentProps>
}

export abstract class Group<Props extends GroupProps> extends Component<Props & GroupProps, {}> {
    render() {
        return (
            <div
                id={this.GetOwnContainerId()}
                className={this.GetOwnCssClass()}
				{...this.props.Attributes}
            >
                <ul
                    id={`${this.props.Id}_group`}
                >
                    
                </ul>
            </div>
        );
    }

    private GetGroupLine = (component: ComponentProps, count: number) => {
        return <Component {...component}/>
    }
}