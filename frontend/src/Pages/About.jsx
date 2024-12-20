import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { RiDoubleQuotesL } from 'react-icons/ri';
import aboutImg from "../assets/about.jpg";


const About = () => {
    const statistics = [
        { label: "Happy clients", value: 45 },
        { label: "Different cities", value: 3 },
        { label: "Properties", value: 12 },
    ]

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const top = aboutSection.getBoundingClientRect().top;
                const isVisible = top < window.innerHeight - 100;
                setIsVisible(isVisible);
            }
        };
        window.addEventListener("scroll", handleScroll);
        //cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])


    return (
        <section id='about' className='max-padd-container py-16 xl:py-28'>
            {/* container */}
            <div className='flex flex-col xl:flex-row gap-10'>
                {/* left */}
                <div className='flex-1 relative'>
                    <img src={aboutImg} className='rounded-3xl rounded-tr-[155px] w-[488px]' alt="" />
                    <div className='bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col'>
                        <span className='relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full'>
                            <RiDoubleQuotesL className='text-2xl' />
                        </span>
                        <p className='text-center relative bottom-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae deleniti in,
                            eum dolorum ipsam accusantium deserunt ullam veniam distinctio vero? Optio
                            officia labore deserunt repellat officiis nulla quo nostrum vel.</p>
                    </div>
                </div>
                {/* right */}
                <div className='flex-1 flex justify-center flex-col'>
                    <span className='medium-18'>Unveiling Our Journey</span>
                    <h2 className=''>Our Commitment Crafting Extraordinary Real Estate Experiences</h2>
                    <p className='py-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic consequatur pariatur quo aperiam illo similique voluptas quam laboriosam accusamus itaque, quos ullam quidem rem rerum, numquam quae. Beatae, accusamus saepe?</p>
                    {/* statistics container */}
                    <div className='flex flex-wrap gap-4'>
                        {statistics.map((statistics, index) => (
                            <div key={index} className='bg-primary p-4 rounded-lg'>
                                <div className='flex items-center gap-1'>
                                    <CountUp start={isVisible ? 0 : null} end={statistics.value} duration={10} delay={3}>
                                        {({ countUpRef }) => (
                                            <h3 ref={countUpRef} className='text-2xl font-semibold'></h3>
                                        )}
                                    </CountUp>
                                    <h4 className='bold-22'>K+</h4>
                                </div>
                                <p>{statistics.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About