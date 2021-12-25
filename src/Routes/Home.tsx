import styled from "styled-components";

const FirstImg = styled.div<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 10px solid ${(props) => props.theme.black.lighter};
  height: 90vh;
`;

const LastWrapper = styled.div`
  height: 70vh;
  border-bottom: 10px solid ${(props) => props.theme.black.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 70px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LastImg = styled.div<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  height: 100%;
  width: 480px;
  background-position: center center;
  background-repeat: no-repeat;
`;

const OverView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 65px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  span {
    font-size: 40px;
    text-align: center;
  }
`;

function Home() {
  return (
    <>
      <FirstImg bgPhoto="https://assets.nflxext.com/ffe/siteui/vlv3/61b1ed99-aa5e-4310-91cb-317f7140c653/f15095cf-da2d-427f-9939-1198c401e18a/KR-ko-20211220-popsignuptwoweeks-perspective_alpha_website_large.jpg">
        <OverView>
          <h1>영화와 시리즈를 무제한으로.</h1>
          <span>
            다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.
          </span>
        </OverView>
      </FirstImg>
      <LastWrapper>
        <Content>
          <LastImg bgPhoto="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" />
          <OverView>
            <h1>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.</h1>
            <span>간편하게 저장하고 빈틈없이 즐겨보세요.</span>
          </OverView>
        </Content>
      </LastWrapper>
    </>
  );
}

export default Home;
