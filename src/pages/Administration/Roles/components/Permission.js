import * as React from 'react';

import Box from '@mui/material/Box';
import { Link, Checkbox, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Modal } from '../../../../components/Modal';
import { useGetPermission } from 'api/permission';




export default function Permission() {
  const [open, setOpen] = React.useState(false);
  const [isView, setIsView] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading, isError } = useGetPermission();
  const permissions = data?.data?.permissions || [];
  console.log(data);

  
  
  const isViewToggle = () => {
    setIsView = true;
    return(
      <></>
     // <SummaryRole />
    )
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  return (
    <div>
    <Link onClick={handleOpen} sx={{color:'#2D75B6', cursor:'pointer'}}>See permissions</Link>

   {/* <ButtonStyles onClick={handleOpen} onClose={isViewToggle} sx={{width:'85%', marginLeft:'30px', marginTop:'15px', textTransform:'capitalize'}} variant="contained" >
           { isView ? <Permission onClickViewPersimssion={ () => setIsView(prev => !prev)}/> : <SummaryRole /> }
</ButtonStyles>
  */}

   
  <Modal
        open={open}
        handleClose={handleClose} >

        
      
     <Box sx={{width:'412px', height:'536px'}}>
      <Typography variant='h2' sx={{textAlign:'center', fontStyle:'normal', marginTop:'20px', marginBottom:'20px'}}>Admin Permissions</Typography>
      
      {[
        { name: 'canViewTransaction', label: 'Can view transaction' },
        { name: 'canExportTransaction', label: 'Can export transaction' },
        { name: 'canViewBusinesses', label: 'Can view businesses' },
        { name: 'canGenerateApiKey', label: 'Can generate API key' },
        { name: 'canViewWithdrawalDetails', label: 'Can view withdrawal details' },
        { name: 'canAddNewBusinesses', label: 'Can add new businesses' },
        { name: 'canExportBusinesses', label: 'Can export businesses' },
        { name: 'canInviteNewMember', label: 'Can invite new member' },
        { name: 'canRemoveExistingMember', label: 'Can remove existing member' },
        { name: 'canCreateRole', label: 'Can create role' },
        { name: 'canChangeRole', label: 'Can change role' }
      ].map((permission) => (
        <Box key={permission.name} sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            {...label}
            name={permission.name}
            checked={permission.name}
          />
          <Typography variant='h5' sx={{ textAlign: 'start', fontStyle: 'normal' }}>{permission.label}</Typography>
        </Box>
      ))}


     </Box>
      </Modal>
    </div>
  );
}