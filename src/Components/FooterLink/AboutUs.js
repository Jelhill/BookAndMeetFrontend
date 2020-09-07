import React from 'react';
import Headers from '../Header';
import Footer2 from '../Footer2';
import ImageRoom12 from '../../Images/room12.jpg';
import ImageRoom2 from '../../Images/room2.jpg';
import ImageRoom3 from '../../Images/room3.jpg';
import ImageRoom8 from '../../Images/room18.jpg';
import ImageRoom5 from '../../Images/room15.jpg';

export default function AboutUs() {
    return (
        <div className="aboutUsWrapper">
            <Headers />
            <div className="aboutUsCoverage">
                <div className="aboutUsImage">
                    <div className="aboutUsImageContent">
                        <h1>Meet, Discuss and Innovate.</h1>
                        <h2>BOARDROOM MEETING SPACE</h2>
                        <p>Welcome to BOARDROOM where meeting meets comfort</p>
                    </div>
                </div>
     
                <div className="aboutUsContent">
                    <h5>ABOUT US</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mus a nunc, aliquam.
                    Natoque orci tortor vitae et id ipsum, gravida turpis.
                    Facilisis ac elit sapien, pharetra viverra vitae tortor pharetra.
                    Malesuada amet aliquet velit eget nisl. Odio quisque vel ut consectetur.
                    At sed adipiscing sit sagittis, nulla massa. Enim laoreet gravida semper pellentesque.
                    Nibh donec nibh gravida felis cras interdum. Non tortor, nunc, massa mauris.
                    Laoreet pharetra aenean pulvinar diam vestibulum a sed.Orci, nibh at non feugiat non faucibus sit in.
                    Donec quis in quis eu auctor in suspendisse in ullamcorper.
                    In sem maecenas varius id risus. Non ultrices turpis rhoncus diam magna vehicula amet.
                    Pellentesque facilisi varius id ipsum.
                    Magnis vehicula nunc, morbi pretium ipsum. A a placerat vitae sit congue arcu netus.
                    Neque, eu orci, volutpat imperdiet nec.
                    Vivamus arcu sapien euismod massa fames curabitur ridiculus pharetra.
                    Sit integer lacus ac risus, nunc. Pulvinar sapien et viverra sagittis eget.
 Ipsum, nulla at cras suspendisse suspendisse. Enim in nunc, enim mattis in.</p>
                </div>

                <h5>YOUR FAVORITE MEETINGS ROOM</h5>
                <div className="aboutUsFavorite">                    
                    <img src={ImageRoom12} alt="Room 12" />
                    <img src={ImageRoom2} alt="Room 12" />
                    <img src={ImageRoom3} alt="Room 12" />
                    <img src={ImageRoom5} alt="Room 12" />
                    <img src={ImageRoom8} alt="Room 12" />
                </div>
            </div>
            <Footer2 />
        </div>
    )
}
