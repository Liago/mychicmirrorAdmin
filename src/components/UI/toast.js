import React from "react";
import { IonToast } from "@ionic/react";

const Toast = (props) => {

    const { color, position, message, duration, textDismiss } = props;

    return (
        <IonToast
            isOpen={true}
            color={color}
            position={position || 'top'}
            message={message}
            duration={duration}
            onDidDismiss={props.autoDismiss ? () => { props.autoDismiss() } : null}
            buttons={props.clickDismiss ?
                [
                    {
                        text: textDismiss || 'Ok',
                        role: 'cancel',
                        handler: () => props.clickDismiss()
                    }
                ] : undefined}
        />
    );

}

export default Toast;