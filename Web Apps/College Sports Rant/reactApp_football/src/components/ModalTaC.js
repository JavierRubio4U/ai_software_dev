import React, { Component } from 'react';
import ReactModal from 'react-modal';

class TCModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div className="row modalBtn">
                <div className="col-xs-12 col-sm-12 col-md-12 text-xs-center text-sm-center text-md-center">
                    <a  onClick={ this.handleOpenModal } >Terms &amp; Conditions</a>
                    <ReactModal isOpen={ this.state.showModal } onRequestClose={ this.handleCloseModal } >
                        <div className="container modalStyle">
                            <div className="row">
                                <div className="col-xs-10 offset-xs-1">
                                    <h1>Terms &amp; Conditions</h1>

                                    <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://collegesportsrant.com website (the "Service") operated by addInfusion, LLC ("us", "we", or "our").</p>

                                    <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.</p>

                                    <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission to access the Service.</p>


                                    <h2>Communications</h2>

                                    <p>By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>

                                    <h2>Content</h2>

                                    <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>

                                    <p>By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.</p>

                                    <p>You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You agree that this license includes the right for us to make your Content available to other users of the Service, who may also use your Content subject to these Terms.</p>

                                    <p>addInfusion, LLC has the right but not the obligation to monitor and edit all Content provided by users.</p>

                                    <p>In addition, Content found on or through this Service are the property of addInfusion, LLC or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>

                                    <h2>Accounts</h2>

                                    <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>

                                    <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

                                    <p>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.</p>

                                    <h2>Links To Other Web Sites</h2>

                                    <p>Our Service may contain links to third party web sites or services that are not owned or controlled by addInfusion, LLC</p>

                                    <p>addInfusion, LLC has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>

                                    <p>You acknowledge and agree that addInfusion, LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services.</p>

                                    <p>We strongly advise you to read the terms and conditions and privacy policies of any third party web sites or services that you visit.</p>

                                    <h2>Termination</h2>

                                    <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>

                                    <p>If you wish to terminate your account, you may simply discontinue using the Service.</p>

                                    <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

                                    <h2>Governing Law</h2>

                                    <p>These Terms shall be governed and construed in accordance with the laws of Missouri, United States, without regard to its conflict of law provisions.</p>

                                    <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.</p>

                                    <h2>Changes</h2>

                                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

                                    <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

                                    <h2>Contact Us</h2>

                                    <p>If you have any questions about these Terms, please contact us.</p>

                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12 text-xs-center text-sm-center text-md-center">
                                            <button className="btn btn-primary" type="submit" onClick={ this.handleCloseModal } >Agree</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </ReactModal>
                </div>
            </div>
        );
    }
}

export default TCModal;
