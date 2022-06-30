export default class SpaceflightTrack {
  static async getSpaceflight(spaceflight) {
    try {
      const response = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/?mode=list&lsp__name=${spaceflight}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
        return error.message;
    }
  }
}