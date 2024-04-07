import {
    Container,
} from 'react-bootstrap';

import HomeImage from '../../assets/images/HomeImage.jpg';

export default function Landing() {
    return (
        <>
            <Container className='landingContainer'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={HomeImage} alt="Landing Image" style={{ height: '60%', width: '60%' }} />
                </div>
                <h6 style={{ textAlign: 'center' }}>Sample Login - randulam@gmail.com - 123456789</h6>
            </Container>
        </>
    )
}
