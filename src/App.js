import { Component } from 'react';
import './App.css';
import emailjs from '@emailjs/browser';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [{ email: '' }]
    };
  }

  addNewParticipant = () => {
    const { participants } = this.state;

    const newParticipants = [...participants];
    newParticipants.push({ email: '' });
    this.setState({ participants: newParticipants });
  };

  deleteParticipant = ({ index }) => {
    const { participants } = this.state;
    this.setState({
      participants: participants.filter((p, i) => i !== index),
    });
  };

  beginLottery = () => {
    const { participants } = this.state;
    emailjs.init('oDoqTFrO5hBn68CwS');

    participants.forEach((p, index) => {
      const { email } = p;
      const otherParticipants = participants.filter((p, i) => i !== index);
      const randomIndex = Math.floor(Math.random() * otherParticipants.length);
      const randomParticipant = otherParticipants[randomIndex];
      const { email: randomEmail } = randomParticipant;

      emailjs.send("service_ew80b8f", "template_mhdts6r", {
        name: email,
        from_name: randomEmail,
        to: email,
      });
    });
  };

  render() {
    const { participants } = this.state;
    return (
      <main className="container p-8 xl:p-20">
        <h1 className='text-3xl font-semibold'>UNIPA 2023 Yılbaşı Çekilişi</h1>
        <p className='mt-2 mb-8'>Kazananlar 2023 yılında açıklanacaktır.</p>

        {
          participants.map((participant, index) => (
            <div className='flex xl:flex-row flex-wrap items-center mt-4'>
              <input
                type="email"
                className='w-full xl:w-2/6 p-2 border border-gray-300 rounded-md'
                placeholder='E-posta adresinizi giriniz'
                value={participant.email}
                onChange={(e) => {
                  const { value } = e.target;
                  const newParticipants = [...participants];
                  newParticipants[index].email = value;
                  this.setState({ participants: newParticipants });
                }}
              />
              {
                index === participants.length - 1 && (
                  <button
                    onClick={this.addNewParticipant}
                    className='mt-4 mr-2 xl:mt-0 xl:ml-4 h-10 w-20 bg-black text-white rounded-md 
            transition-all duration-300 hover:rounded-3xl'>
                    Ekle
                  </button>
                )}

              {
                index > 0 && (
                  <button
                    onClick={() => this.deleteParticipant({ index: index })}
                    className='mt-4 xl:mt-0 xl:ml-4 h-10 w-20 bg-red-500 text-white rounded-md
            transition-all duration-300 hover:rounded-3xl'>
                    Sil
                  </button>
                )
              }
            </div>
          ))
        }

        <button
          onClick={this.beginLottery}
          className='mt-8 h-10 px-4 bg-indigo-900 text-white rounded-md transition-all duration-300 hover:rounded-3xl'>
          Çekilişi Başlat
        </button>
      </main>
    );
  }
}

export default App;
