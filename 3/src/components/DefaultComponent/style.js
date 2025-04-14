import styled from "styled-components";

export const WrapperPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Chiếm toàn bộ chiều cao màn hình */
`;

export const WrapperContent = styled.main`
    flex: 1; /* Đẩy Footer xuống cuối nếu nội dung không đủ dài */
`;
