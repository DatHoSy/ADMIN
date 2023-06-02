import notFoundPageImg from 'components/assets/img/NotFoundPage.jpg';
import styled from 'styled-components';

const StyleNotFoundPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1400;
    height: 550;
    img {
        width: 100%;
        height: 100%;
    }
`

export const NotFoundPage = () => {
    return (
        <StyleNotFoundPage>
            <img src={notFoundPageImg} alt="" />
        </StyleNotFoundPage>
    )
}