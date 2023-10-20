import { API } from "@/utils/api";

export async function fetchLogs() {
  return await API.get('admin/logs?page=0');
}
