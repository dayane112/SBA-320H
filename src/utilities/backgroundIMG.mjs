export default function backgroundIMG(condition) {
    const conditions = condition.toLowerCase();
    switch (true) {
        case conditions.includes('clear'):
            return 'https://images.pexels.com/photos/2344227/pexels-photo-2344227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        case conditions.includes('clouds'):
            return 'https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        case conditions.includes('rain'):
            return 'https://images.pexels.com/photos/1166991/pexels-photo-1166991.jpeg'
        case conditions.includes('snow'):
            return 'https://images.pexels.com/photos/8624948/pexels-photo-8624948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        case conditions.includes('sun'):
            return 'https://images.pexels.com/photos/2792078/pexels-photo-2792078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
}