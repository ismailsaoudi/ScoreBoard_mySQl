import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '100%',
      height: '100%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      backgroundColor: 'black'
    },
    h2: {
      textAlign: 'center',
      fontSize: '12rem',
      color: '#FDC72E',
      margin: '4rem 0',
    },
    button: {
      display: 'block',
      margin: '2rem auto',
      fontSize: '1rem',
      backgroundColor: 'black',
      color: '#FDC72E',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '1rem',
      cursor: 'pointer',
    }
  };

class BuzzerTimes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalContent: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const now = new Date();
    const startTime1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0); // 9:00 AM
    const startTime2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 54, 0); // 1:00 PM

    // Calculate the time difference between now and the start times in milliseconds
    const diff1 = startTime1.getTime() - now.getTime();
    const diff2 = startTime2.getTime() - now.getTime();

    // Set a timeout for each start time to open the appropriate modal
    setTimeout(() => {
      this.setState({
        modalOpen: true,
        modalContent: 'BREAK TIME ',
      });
    }, diff1);

    setTimeout(() => {
      this.setState({
        modalOpen: true,
        modalContent: '5S TIME',
      });
    }, diff2);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2 style={customStyles.h2}>{this.state.modalContent}</h2>
          <button onClick={this.closeModal} style={customStyles.button}>
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

export default BuzzerTimes;
