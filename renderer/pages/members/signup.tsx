import Container from '@material-ui/core/Container';
import TopMenu from '../../components/layout/TopMenu';
import SignUpForm from '../../components/member/SignUpForm';

const SignUp: React.FC = () => {


    return <Container maxWidth="lg">
        <TopMenu message="이미 계정이 있나요?" hrefUrl={"/members/signin"} btnTxt={"로그인"} />
        <SignUpForm />
    </Container>;
}

export default SignUp;