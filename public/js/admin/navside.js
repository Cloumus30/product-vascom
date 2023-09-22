/**
 * Get Id Of Navside li from current url
 * @returns string | null
 */
function getIdNavside(){
    const pathname = window.location.pathname || '';
    switch (pathname) {
        case '/admin/dashboard':
            return 'dashboard'

        case '/admin/manage-user':
            return 'manage-user'

        case '/admin/manage-product':
            return 'manage-product'
    
        default:
            return null;
    }
}

export default (
    window.addEventListener('load', function(){
        const navside = document.getElementById('contain-navside')
        if(navside){
            const idNav = getIdNavside()
            const li = navside.querySelector(`#${idNav}`).querySelector('a')
            li.className = 'flex items-center p-2 text-white bg-blue-500 rounded-lg group'
            const icon = li.querySelector('iconify-icon')
            icon.style.color = 'white'
        }
    })
    
)