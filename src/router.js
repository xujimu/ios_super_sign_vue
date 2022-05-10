import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import Home from './components/Home'
import Personal from './components/Personal'
import AllApp from './components/AppAll'
import UploadApp from './components/UploadApp'
import CertAll from "./components/CertAll";
import UploadCert from "./components/UploadCert";
import UserAll from "./components/UserAll";
import DownRecord from "./components/DownRecord";
import DownCode from "./components/DownCode";
import PackRecord from "./components/PackRecord";
import StartPack from "./components/StartPack";
import UploadAppSign from "./components/UploadAppSign";
import SignRecord from "./components/SignRecord";
import SoftwareDistribute from "./components/SoftwareDistribute";
import DistributeRecord from "./components/DistributeRecord";
import UploadEnterpriseCert from "./components/UploadEnterpriseCert";
import DomainList from "./components/DomainList";
import AddDomain from "./components/AddDomain";
import Setting from "./components/Setting";
import IosCertAll from "./components/IosCertAll";
import IosAppAll from "./components/IosAppAll";
import UploadIosApp from "./components/UploadIosApp";
import UploadIosCert from "./components/UploadIosCert";
import PackIosSignStatus from "./components/PackIosSignStatus";
import MdmCert from "./components/MdmCert";
import UploadMdmCert from "./components/UploadMdmCert";

import MdmAppAll from "./components/MdmAppAll";
import MdmUploadApp from "./components/MdmUploadApp";
import MdmDownCode from "./components/MdmDownCode";
import MdmDistributeRecord from "./components/MdmDistributeRecord";
import MdmSoftwareDistribute from "./components/MdmSoftwareDistribute";
import MdmSuperDownRecord from "./components/MdmSuperDownRecord";
import MdmSoftwareDownRecord from "./components/MdmSoftwareDownRecord";
import SettingKouliang from "./components/SettingKouliang";
import ShuoMing from "./components/ShuoMing";
import DistributeDownRecord from "./components/DistributeDownRecord";
import IosDownRecord from "./components/IosDownRecord";



Vue.use(VueRouter)

  const routes = [

]

const router = new VueRouter({
  routes: [
    { path: '/login', component : Login},
    { path: '/', redirect: '/login'},
    {
      path: '/Home',
      component : Home,
      redirect: '/Personal',
      children: [
          { path: '/Personal', component : Personal},
          { path: '/AppAll', component : AllApp},
          { path: '/UploadApp', component : UploadApp},
          { path: '/CertAll', component : CertAll},
          { path: '/UploadCert', component : UploadCert},
          { path: '/UserAll', component : UserAll},
          { path: '/DownRecord', component : DownRecord},
          { path: '/DownCode', component : DownCode},
          { path: '/PackRecord', component : PackRecord},
          { path: '/StartPack', component : StartPack},
          { path: '/UploadAppSign', component : UploadAppSign},
          { path: '/SignRecord', component : SignRecord},
          { path: '/SoftwareDistribute', component : SoftwareDistribute},
          { path: '/DistributeRecord', component : DistributeRecord},
          { path: '/UploadEnterpriseCert', component : UploadEnterpriseCert},
          { path: '/DomainList', component : DomainList},
          { path: '/AddDomain', component : AddDomain},
          { path: '/Setting', component : Setting},
          { path: '/IosCertAll', component : IosCertAll},
          { path: '/IosAppAll', component : IosAppAll},
          { path: '/UploadIosCert', component : UploadIosCert},
          { path: '/UploadIosApp', component : UploadIosApp},
          { path: '/PackIosSignStatus', component : PackIosSignStatus},
          { path: '/MdmCert', component : MdmCert},
          { path: '/UploadMdmCert', component : UploadMdmCert},
          { path: '/MdmAppAll', component : MdmAppAll},
          { path: '/MdmDownCode', component : MdmDownCode},
          { path: '/MdmUploadApp', component : MdmUploadApp},
          { path: '/MdmDistributeRecord', component : MdmDistributeRecord},
          { path: '/MdmSoftwareDistribute', component : MdmSoftwareDistribute},
          { path: '/MdmSuperDownRecord', component : MdmSuperDownRecord},
          { path: '/MdmSoftwareDownRecord', component : MdmSoftwareDownRecord},
          { path: '/SettingKouliang', component : SettingKouliang},
          { path: '/ShuoMing', component : ShuoMing},
          { path: '/DistributeDownRecord', component : DistributeDownRecord},
          { path: '/IosDownRecord', component : IosDownRecord}

      ]
    }
  ]
})

export default router
