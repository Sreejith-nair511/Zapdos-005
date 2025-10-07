// Authentication utility functions
export class Auth {
  static logout() {
    // Clear any stored authentication data
    if (typeof window !== 'undefined') {
      // Clear localStorage items related to auth
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      
      // Clear sessionStorage items related to auth
      sessionStorage.clear();
      
      // Redirect to login page or home page
      window.location.href = '/';
    }
  }
  
  static isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('authToken');
  }
}