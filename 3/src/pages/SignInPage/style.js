import styled from "styled-components";

export const WrapperContainerLeft = styled.div`
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    flex: 1;
    padding: 40px 45px 24px;
    display: flex;
    flex-direction: column;
`


export const WrapperContainerRight = styled.div`
    width: 300px;
    background: linear-gradient(136deg,  rgb(234, 210, 213) -1%, rgb(212,162,161) 85%);
    display: flex;
    justify-content:  center;;
    flex-direction: column;
    align-items: center;    
    gap: 4px;
`

export const WrapperTextLight = styled.span`
    color: rgb(13,92,182);
    font-size: 13px;
    cursor: pointer;
`;
