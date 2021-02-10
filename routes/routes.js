import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import LoginComponent from '../components/LoginComponent';
import RecoverPasswordComponent from '../components/LoginComponent/RecoverPasswordComponent';
import ForgotPasswordCodeComponent from '../components/LoginComponent/ForgotPasswordCodeComponent';
import NewPasswordComponent from '../components/LoginComponent/NewPasswordComponent';
import DrawerComponent from '../components/DrawerComponent';
import InviteComponent from '../components/InviteComponent';
import UploadCoverPageComponent from '../components/CoverPageComponent/UploadCoverPageComponent';
import CreateHeadlineComponent from '../components/HeadLines/CreateHeadlineComponent';
import CreatePublicationComponent from '../components/Publication/CreatePublicationComponent';
import ViewHeadlinesComponent from '../components/HeadLines/ViewHeadlinesComponent'
import PublicationListComponent from '../components/Publication/PublicationListComponent';
import SelectedPublicationComponent from '../components/Publication/SelectedPublicationComponent';
import CreatePublisherComponent from '../components/PublisherComponent/CreatePublisherComponent';
import SelectedHeadlineComponent from '../components/HeadLines/SelectedHeadlineComponent';
import ViewCoverPageComponent from '../components/CoverPageComponent/ViewCoverPageComponent';
import RegisterComponent from '../components/RegisterComponent';
import PublicationHeadlinesComponent from '../components/HeadLines/PublicationHeadlinesComponent';
import EditHeadlineComponent from '../components/HeadLines/EditHeadlineComponent';
import PublicationCoverPageComponent from '../components/CoverPageComponent/PublicationCoverPageComponent';
import SelectedCoverPageComponent from '../components/CoverPageComponent/SelectedCoverPageComponent';
import ViewPublishersComponent from '../components/PublisherComponent/ViewPublishersComponent';
import SelectedPublisherComponent from '../components/PublisherComponent/SelectedPublisherComponent';
import EditPublisherComponent from '../components/PublisherComponent/EditPublisherComponent';
import CommentComponent from '../components/CommentComponent';
import AboutusComponent from '../components/AboutusComponent';
import ChangePasswordComponent from '../components/UserComponent/ChangePasswordComponent';
import FilterComponent from '../components/Publication/FilterComponent';
import SortComponent from '../components/Publication/SortComponent';
import ProfileComponent from '../components/UserComponent/ProfileComponent';
import EditProfileComponent from '../components/UserComponent/EditProfileComponent';
import EditPublicationComponent from '../components/Publication/EditPublicationComponent';
import EditCoverPageComponent from '../components/CoverPageComponent/EditCoverPageComponent';

/** employee **/
import EmployeeComponent from '../components/EmployeeComponent';
import EmployeeCoverPageMenu from '../components/EmployeeComponent/Menu/EmployeeCoverPageMenu';
import EmployeeHealinesMenu from '../components/EmployeeComponent/Menu/EmployeeHealinesMenu';


/** system admin **/
import SystemAdminComponent from '../components/SystemAdminComponent';
import SystemAdminPublicationMenu from '../components/SystemAdminComponent/Menu/SystemAdminPublicationMenu';
import SystemAdminPublisherMenu from '../components/SystemAdminComponent/Menu/SystemAdminPublisherMenu';
import SystemAdminHeadlineMenu from '../components/SystemAdminComponent/Menu/SystemAdminHeadlineMenu';
import SystemAdminCoverPageMenu from '../components/SystemAdminComponent/Menu/SystemAdminCoverPageMenu';



/** Agent **/
import AgentComponent from '../components/AgentComponent';


/* Super Admin **/
import SuperAdministratorComponent from '../components/SuperAdministratorComponent';


/* Vendor **/
import VendorsComponent from '../components/VendorsComponent';


/** Sub Employeee **/
import SubEmployeeComponent from '../components/SubEmployeeComponent';


/** Reader **/
import  ReaderComponent from '../components/ReaderComponent';
import ReaderRegistrationComponent from '../components/RegisterComponent/ReaderRegistrationComponent';
import ReaderHeadlinesMenu from '../components/ReaderComponent/Menu/ReaderHeadlinesMenu';
import ReaderCoverPageMenu from '../components/ReaderComponent/Menu/ReaderCoverPageMenu';
import filterPublicationAction from "../actions/publication/filterPublicationAction";


const EmployeeDrawerNavigator=DrawerNavigator({
    Home:{
        screen:StackNavigator({
            Dashboard: {
                screen: EmployeeComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Invite:{
        screen:StackNavigator({
            Dashboard: {
                screen: InviteComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    CoverPage:{
        screen:StackNavigator({
            Dashboard: {
                screen: EmployeeCoverPageMenu
            },
            UploadCoverPageComponent:{
                screen:UploadCoverPageComponent
            },
            EmployeePublicationList:{
                screen:StackNavigator({
                    publicationList:{
                        screen:PublicationCoverPageComponent
                    },
                    viewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    },
                    editCoverPage:{
                        screen:EditCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    HeadLines:{
        screen:StackNavigator({
            Dashboard: {
                screen: EmployeeHealinesMenu
            },
            createHeadlines:{
                screen:CreateHeadlineComponent
            },
            publicationList:{
                screen:StackNavigator({
                    publicationList:{
                        screen:PublicationHeadlinesComponent
                    },
                    filterPublications:{
                        screen:FilterComponent
                    },
                    sortPublications:{
                        screen:SortComponent
                    },
                },{ headerMode: 'none'})
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    editHeadline:{
                        screen:EditHeadlineComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
                screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    }
},{contentComponent:DrawerComponent });

/** sub employee **/

const SubEmployeeNavigator=DrawerNavigator({

    Home:{
        screen:StackNavigator({
            Dashboard: {
                screen: SubEmployeeComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Invite:{
        screen:StackNavigator({
            Dashboard: {
                screen: InviteComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    ReaderHeadLines:{
        screen:StackNavigator({
            publicationList:{
                screen:ReaderHeadlinesMenu
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    commnent:{
                        screen:CommentComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    ReaderCoverPage:{
        screen:StackNavigator({
            ReaderPublicationListf:{
                screen:ReaderCoverPageMenu
            },
            ReaderPublicationList:{
                screen:StackNavigator({
                    ReaderPublicationList:{
                        screen:ReaderCoverPageMenu
                    },
                    ReaderViewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
                screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    }

},{contentComponent:DrawerComponent });

/** Super Admin **/
const SuperAdminNavigator=DrawerNavigator({

    Home:{
        screen:StackNavigator({
            Dashboard: {
                screen: SuperAdministratorComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    publisherMenu:{
        screen:StackNavigator({
            SysAdminmenu:{
                screen:StackNavigator({
                    SysAdminmenu:{
                        screen:SystemAdminPublisherMenu
                    },
                    createPublisher:{
                        screen:CreatePublisherComponent
                    },
                    viewBuplisher:{
                        screen:ViewPublishersComponent
                    },
                    selectedPublisher:{
                        screen:SelectedPublisherComponent
                    },
                    editPublisher:{
                        screen:EditPublisherComponent
                    },
                },{navigationOptions:{
                    headerTitleStyle:{color:'#fff'}
                }})
            }
        },{ headerMode: 'none'},{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    publicationMenu:{
        screen:StackNavigator({
            menu:{
                screen:SystemAdminPublicationMenu
            },
            createPublication:{
                screen:CreatePublicationComponent
            },
            publicationList:{
                screen:StackNavigator({
                    publicationList:{
                        screen:PublicationListComponent
                    },
                    selectedPublication:{
                        screen:SelectedPublicationComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    CoverPage:{
        screen:StackNavigator({
            Dashboard: {
                screen: SystemAdminCoverPageMenu
            },
            UploadCoverPageComponent:{
                screen:UploadCoverPageComponent
            },
            publicationList:{
                screen:StackNavigator({
                    publicationList:{
                        screen:PublicationCoverPageComponent
                    },
                    viewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },

        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    HeadLines:{
        screen:StackNavigator({
            Dashboard: {
                screen: SystemAdminHeadlineMenu
            },
            createHeadlines:{
                screen:CreateHeadlineComponent
            },
            publicationList:{
                screen:PublicationHeadlinesComponent
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    editHeadline:{
                        screen:EditHeadlineComponent
                    },
                    commnent:{
                        screen:CommentComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
                screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Invite:{
        screen:StackNavigator({
            Dashboard: {
                screen: InviteComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
},{contentComponent:DrawerComponent });




/** Agent **/
const AgentNavigator=DrawerNavigator({

    Home:{
        screen:StackNavigator({
            Dashboard: {
                screen: AgentComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Invite:{
        screen:StackNavigator({
            Dashboard: {
                screen: InviteComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    ReaderHeadLines:{
        screen:StackNavigator({
            publicationList:{
                screen:ReaderHeadlinesMenu
            },
            filterPublications:{
                screen:FilterComponent
            },
            sortPublications:{
                screen:SortComponent
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    commnent:{
                        screen:CommentComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    ReaderCoverPage:{
        screen:StackNavigator({
            ReaderPublicationListf:{
                screen:ReaderCoverPageMenu
            },
            ReaderPublicationList:{
                screen:StackNavigator({
                    ReaderPublicationList:{
                        screen:ReaderCoverPageMenu
                    },
                    ReaderViewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
                screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    }

},{contentComponent:DrawerComponent });






const SystemAdminNavigator=DrawerNavigator({
    Home:{
        screen:StackNavigator({
            Dashboard: {
                screen: SystemAdminComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    publisherMenu:{
        screen:StackNavigator({
            SysAdminmenu:{
                screen:SystemAdminPublisherMenu
            },
            createPublisher:{
                screen:CreatePublisherComponent
            },
            viewPulisher:{
                screen:ViewPublishersComponent
            },
            selectedPublisher:{
                screen:SelectedPublisherComponent
            },
            editPublisher:{
                screen:EditPublisherComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}}})

    },
    publicationMenu:{
        screen:StackNavigator({
            menu:{
                screen:SystemAdminPublicationMenu
            },
            createPublication:{
                screen:CreatePublicationComponent
            },
            publicationList:{
                screen:StackNavigator({
                    publicationList:{
                        screen:PublicationListComponent
                    },
                    selectedPublication:{
                        screen:SelectedPublicationComponent
                    },
                    editPublication:{
                        screen:EditPublicationComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    CoverPage:{
        screen:StackNavigator({
            Dashboard: {
                screen: SystemAdminCoverPageMenu
            },
            UploadCoverPageComponent:{
                screen:UploadCoverPageComponent
            },
            publicationList:{
                screen:StackNavigator({
                    publicationList:{
                        screen:PublicationCoverPageComponent
                    },
                    viewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },

        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    HeadLines:{
        screen:StackNavigator({
            Dashboard: {
                screen: SystemAdminHeadlineMenu
            },
            createHeadlines:{
                screen:CreateHeadlineComponent
            },
            publicationList:{
                screen:PublicationHeadlinesComponent
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    editHeadline:{
                        screen:EditHeadlineComponent
                    },
                    commnent:{
                        screen:CommentComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
                screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Invite:{
        screen:StackNavigator({
            Dashboard: {
                screen: InviteComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
},{contentComponent:DrawerComponent });


const ReaderNavigator=DrawerNavigator({

    Dashboard: {
        screen:StackNavigator({
            Dashboard:{
                screen:ReaderComponent
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    ReaderHeadLines:{
        screen:StackNavigator({
            publicationList:{
                screen:ReaderHeadlinesMenu
            },
            filterPublications:{
                screen:FilterComponent
            },
            sortPublications:{
                screen:SortComponent
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    commnent:{
                        screen:CommentComponent
                    }
                },{ headerMode: 'none'})
            },
            Aboutus:{
                screen:StackNavigator({
                    Aboutus:{
                        screen:AboutusComponent
                    }
                },{navigationOptions:{
                    headerTitleStyle:{color:'#fff'}
                }, headerMode: 'none'})
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    ReaderCoverPage:{
        screen:StackNavigator({
            ReaderPublicationListf:{
                screen:ReaderCoverPageMenu
            },
            ReaderPublicationList:{
                screen:StackNavigator({
                    ReaderPublicationList:{
                        screen:ReaderCoverPageMenu
                    },
                    ReaderViewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
                screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    }
    },{contentComponent:DrawerComponent });


/** Vendors **/
const VendorsNavigator=DrawerNavigator({

    Home:{
        screen:StackNavigator({
            Dashboard: {
                screen: VendorsComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    VendorHeadLines:{
        screen:StackNavigator({
            publicationList:{
                screen:ReaderHeadlinesMenu
            },
            filterPublications:{
                screen:FilterComponent
            },
            sortPublications:{
                screen:SortComponent
            },
            viewHeadlines:{
                screen:StackNavigator({
                    viewHeadlines:{
                        screen:ViewHeadlinesComponent
                    },
                    selectedHeadline:{
                        screen:SelectedHeadlineComponent
                    },
                    commnent:{
                        screen:CommentComponent
                    }
                },{ headerMode: 'none'})
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }}),
    },
    VendorCoverPage:{
        screen:StackNavigator({
            ReaderPublicationListf:{
                screen:ReaderCoverPageMenu
            },
            ReaderPublicationList:{
                screen:StackNavigator({
                    ReaderPublicationList:{
                        screen:ReaderCoverPageMenu
                    },
                    ReaderViewCoverPage:{
                        screen:ViewCoverPageComponent
                    },
                    selectedCoverPage:{
                        screen:SelectedCoverPageComponent
                    }
                },{ headerMode: 'none'})
            },
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Profile:{
        screen:StackNavigator({
            Profile:{
                screen:ProfileComponent
            },
            EditProfile:{
                screen:EditProfileComponent
            },
            changePassword:{
              screen:ChangePasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    }
},{contentComponent:DrawerComponent });





const MyNavigator=StackNavigator({

    Login:{

        screen:LoginComponent
    },
    ForgotPassword:{
        screen:StackNavigator({

            Phones:{
                screen:RecoverPasswordComponent
            },
            Code:{
                screen:ForgotPasswordCodeComponent
            },
            NewPassword:{
                screen:NewPasswordComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Register:{
        screen:StackNavigator({

            Home:{
                screen:RegisterComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    RegisterUser:{
        screen:StackNavigator({

            Home:{
                screen:ReaderRegistrationComponent
            }
        },{navigationOptions:{
            headerTitleStyle:{color:'#fff'}
        }})
    },
    Employee:{
        screen:EmployeeDrawerNavigator
    },
    SubEmployee:{
      screen:SubEmployeeNavigator
    },
    SystemAdmin:{
        screen:SystemAdminNavigator
    },
    SuperAdmin:{
        screen:SuperAdminNavigator
    },
    Vendors:{
        screen:VendorsNavigator
    },
    Agent:{
        screen:AgentNavigator
    },
    Reader:{
        screen:ReaderNavigator
    }

},{ headerMode: 'none'});




export default  MyNavigator;