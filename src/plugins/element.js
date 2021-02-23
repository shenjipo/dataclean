import Vue from 'vue'

import {Button,Form,FormItem,Input,Message,Container,Header,Aside,Main
  ,Menu,Submenu,MenuItem,MenuItemGroup,Breadcrumb,BreadcrumbItem,Card
  ,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog
  ,Divider, Checkbox,Option,Select,DatePicker,Transfer,Progress} from 'element-ui'

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Checkbox);
Vue.use(Option);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Transfer);
Vue.use(Progress);
//全局挂载
Vue.prototype.$message = Message;
