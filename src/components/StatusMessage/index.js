import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './style.scss';
import { VscCheckAll } from "react-icons/vsc";
import { ImSpinner3 } from "react-icons/im";
import { BsLightning } from "react-icons/bs";

export default class StatusMessage extends Component {
    render() {
        const {
            loading,
            loadingClassName,
            loadingMessage,
            error,
            errorClassName,
            errorMessage,
            success,
            successClassName,
            successMessage,
            nothing,
            nothingClassName,
            nothingMessage,
            type,
        } = this.props;

        if (loading) {
            if (type === 'modal') {
                return (
                    <div className={loadingClassName || 'statusMessage-modal'}>
                        <div>
                            <ImSpinner3/>&nbsp;{loadingMessage || 'Loading ...'}
                        </div>
                    </div>
                );
            }
            return (
                <div className={loadingClassName || 'statusMessage-default'}>
                    <Spinner variant='secondary' />
                    <br />
                    <div>
                        {loadingMessage || 'We are fetching the content for you.'}
                    </div>
                </div>
            );
        } else if (error) {
            if (type === 'modal') {
                return (
                    <div className={errorClassName || 'statusMessage-modal'}>
                        <div>
                            <BsLightning />&nbsp;{errorMessage || error || 'Sorry, something went wrong'}
                        </div>
                    </div>
                );
            }
            return (
                <div className={errorClassName || 'statusMessage-default'}>
                    <div>
                        {errorMessage || error || 'Sorry, something went wrong'}
                    </div>
                </div>
            );
        } else if (success) {
            if (type === 'modal') {
                return (
                    <div className={successClassName || 'statusMessage-modal'}>
                        <div>
                            <VscCheckAll />&nbsp;{successMessage || 'Successful'}
                        </div>
                    </div>
                );
            }
            return (
                <div className={successClassName || 'statusMessage-default'}>
                    <div>
                        {successMessage || 'Successful'}
                    </div>
                </div>
            );
        } else if (nothing) {
            if (type === 'modal') {
                return (
                    <div className={nothingClassName || 'statusMessage-modal'}>
                        <div>
                            {nothingMessage || 'Successful'}
                        </div>
                    </div>
                );
            }
            return (
                <div className={nothingClassName || 'statusMessage-default'}>
                    <div>
                        {nothingMessage || 'Nothing to display'}
                    </div>
                </div>
            );
        }
        return null;
    }
}
