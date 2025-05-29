import Logo from '../components/Logo'
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from './supabaseClient'
import video1 from '../../assets/video/video1.mov'
import video2 from '../../assets/video/video2.mov'
export function WaitlistForm() {
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [subscribedEmail, setSubscribedEmail] = React.useState(null)

    React.useEffect(() => {
        const savedEmail = localStorage.getItem('subscribedEmail')
        if (savedEmail) {
            setSubscribedEmail(savedEmail)
        }
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const { error } = await supabase.from('waitlist').insert([{ email, feedback }])
        if (error) {
            setError(error.message)
        } else {
            localStorage.setItem('subscribedEmail', email)
            setSubmitted(true)
            setEmail('')
            setFeedback('')
        }
    }
    if (subscribedEmail) return <p className='mt-20 bg-blue-500 text-[20px] rounded-xl p-2 w-[400px] text-center'>Thank you! You are already subscribed with <span className='text-red-300'>{subscribedEmail}</span></p>;
    if (submitted) return <p className='mt-20 bg-blue-500 text-[20px] rounded-xl p-2 w-[400px] text-center'>Thank you! We will get in touch with you</p>;


    return (
        <div className='relative flex flex-col bg-white rounded-xl mt-15'>
            <form className='flex flex-col p-4' onSubmit={handleSubmit}>
                <input
                    className='bg-black p-4 rounded-xl'
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <textarea
                    className='bg-black p-4 mt-2 max-h-[200px] min-h-[90px] rounded-xl'
                    placeholder="Your feedback"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                />
                <button className='bg-[#005BFF] cursor-pointer mt-5 p-5 rounded-xl text-[30px]' style={{ fontFamily: "Oswald" }} type="submit">Waiting list</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <div className='absolute bg-blue-700 top-[-25px] rotate-10 right-[-20%] p-2 rounded-2xl' style={{ fontFamily: "Oswald" }}><p>BE THE FIRST TO KNOW WHEN WE LAUNCH</p></div>
        </div>

    )
}


export default function Landing() {

    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}
function Pain({ h1, h4, p }) {
    return (
        <div className='flex flex-col items-center text-center'>
            <h1 className="text-[50px] pt-30  font-bold max-xl:text-[40px] max-lg:text-[30px] pb-10" style={{ fontFamily: "Oswald" }}>{h1}</h1>
            <div className=''>
                {h4.map((text, index) => (
                    <h4 className="text-[35px] max-md:text-[25px]" style={{ fontFamily: "Oswald" }} key={index}>{text}</h4>
                ))}
            </div>
            <p style={{ fontFamily: "Oswald" }} className='text-gray-400 font-bold'>{p}</p>
        </div>
    );
}



function Header() {
    const videoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const videos = [
        video1, video2
    ]

    const handleVideoEnd = () => {
        // Переход к следующему видео по кругу
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.src = videos[currentIndex];
            videoElement.play();
        }
    }, [currentIndex]);
    return (
        <div className='relative w-full h-[800px] bg-[black]/60'>
            <Logo className='h-20 absolute left-10' />
            <div className='h-full flex flex-col justify-center items-center'>
                <Pain
                    h1="😫 You keep saying “I’ll start tomorrow” But you never do"
                    h4={[
                        "📉 Weeks fly by, nothing changes",
                        "📱 You're glued to Reels, YouTube, Reddit",
                        "⏳ You’re 18, 22, 27… and your life feels frozen"
                    ]}
                    p="This tool kicks you into action. Daily structure. Real progress. Actual transformation"
                />
                <WaitlistForm />
                {/* 
                <Pain
                    h1="😔 You feel invisible. And it's eating you alive"
                    h4={[
                        "📵 No support",
                        "👻 No growth-minded friends",
                        "🕳️ You’re alone — and you know it"
                    ]}
                    p="This is your partner in progress. A system that shows up when no one else does. You're not alone in this anymore"
                /> */}
            </div>
            <video
                ref={videoRef}
                width="640"
                height="360"
                onEnded={handleVideoEnd}
                autoPlay
                muted
                className='absolute inset-0 z-[-1] w-screen object-cover w-full h-full'
            />
        </div>
    )
}
function Main() {
    return (
        <div className='bg-gradient-to-r from-black to-purple-900'>
            <p class="text-red-600 text-[70px] text-center text-xl font-semibold pt-40 pb-40 max-xl:text-[60px] max-md:pb-0">
                We are here to help you get rid of this
            </p>
            <Pain
                h1="💸 You're terrified of being broke — but still doing nothing"
                h4={[
                    "💀 “If I lose my job, I’m screwed”",
                    "😶‍🌫️ “I want to build something, but I don’t know where to start”",
                    "⛓️ You’re stuck in a loop: craving freedom but clinging to comfort"
                ]}
                p="This is your escape route. You start building your next source of income. Step by step. No fluff"
            />
    <p class="text-blue-600 text-[70px] text-center text-xl font-semibold pt-40 pb-40 max-xl:text-[60px]">
                Join the waitlist to get out of this together
            </p>
        </div>
    )
}