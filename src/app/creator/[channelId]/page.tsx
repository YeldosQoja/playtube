import "./page.css";
import { UploadDialog } from "./_components/upload-dialog";
import { getVideoCategories } from "@/lib/data/categories";
import { CategoriesProvider } from "@/providers/categories";
import { PlaylistsProvider } from "@/providers/playlists";
import { getPlaylists } from "@/lib/data/playlists";

export default async function Dashboard() {
  const [categories, playlists] = await Promise.all([
    getVideoCategories(),
    getPlaylists(),
  ]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <CategoriesProvider categories={categories}>
        <PlaylistsProvider playlists={playlists}>
          <UploadDialog />
        </PlaylistsProvider>
      </CategoriesProvider>
    </div>
  );
}
