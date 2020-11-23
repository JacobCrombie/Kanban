import Swal from "sweetalert2"


export default class NotificationService {

  static async confirmAction(title = "Are you sure?", text = "You won't be able to revert changes!", confirmButtonText = "Yes, delete it") {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
      })
      if (res.value) {
        return true
      }
      return false
    } catch (error) {
      console.error(error)
    }
  }
}