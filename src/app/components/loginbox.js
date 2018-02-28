import React from "react";
import { connect } from "react-redux";
import { setCookie, getCookie, delCookie } from "../utils/common";
import { cookie_alive, login, toggleLoginBox } from "../redux/actions";
import { Modal, Form, Button, Input, Icon, Checkbox } from "antd";
const FormItem = Form.Item;

@connect(store => {
  return {
    user: store.user
  };
})
export default class loginbox extends React.Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loged != this.props.user.loged) {
      this.close(nextProps.user.loged);
    }
  }
  close(bl) {
    if (bl) {
      this.props.dispatch(toggleLoginBox());
    } else {
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.user.showLogin}
        width={400}
        maskClosable={true}
        footer={null}
        title="Login"
        zIndex="10000"
        maskStyle={{ backgroundColor: "rgba(0,0,0,.95)" }}
        onCancel={this.close.bind(this)}
      >
        <WrappedNormalLoginForm />
      </Modal>
    );
  }
}

@connect(store => {
  return {
    user: store.user
  };
})
class NormalLoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      logError: false,
      msg: ""
    };
  }
  handleSubmit = e => {
    var _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(
          login(values.phone, values.password, this.fetchCallbak.bind(this))
        );
      }
    });
  };
  fetchCallbak(code, msg) {
    switch (code) {
      case 200: {
        this.setState({
          logError: false,
          msg: ""
        });
        break;
      }
      case 502: {
        this.setState({
          logError: true,
          msg: "账号或密码错误"
        });
        break;
      }
      case 503: {
        this.setState({
          logError: true,
          msg: ""
        });
      }
      case 504: {
        this.setState({
          logError: true,
          msg: "网络异常"
        });
      }
    }
  }
  changeHandler() {
    this.setState({
      logError: false,
      msg: ""
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const validateStatus = this.state.logError
      ? { validateStatus: "error" }
      : {};
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem hasFeedback {...validateStatus}>
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                message: "请输入有效的手机号"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="shake" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Cellphoe"
              size="large"
              help={this.state.msg}
              onChange={this.changeHandler.bind(this)}
            />
          )}
        </FormItem>
        <FormItem help={this.state.msg} {...validateStatus} hasFeedback>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              size="large"
              onChange={this.changeHandler.bind(this)}
            />
          )}
        </FormItem>
        <FormItem style={{ marginBottom: "0" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            style={{ width: "100%" }}
            loading={this.props.user.loging}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
