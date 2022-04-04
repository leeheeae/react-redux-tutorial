import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
};

const mapStateToProps = (state) => ({});

export default connect((state) => ({ number: state.counter.number }), {
    increase,
    decrease,
})(CounterContainer);
