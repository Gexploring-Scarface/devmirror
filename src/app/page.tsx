import { Navbar } from "@/components/shell/Navbar";
import { Footer } from "@/components/shell/Footer";
import { DashboardGrid } from "@/components/shell/DashboardGrid";
import { LeetCodePanel } from "@/components/panels/leetcode/LeetCodePanel";
import { GitHubPanel } from "@/components/panels/github/GitHubPanel";
import { CodeforcesPanel } from "@/components/panels/codeforces/CodeforcesPanel";
import { CodeChefPanel } from "@/components/panels/codechef/CodeChefPanel";
import { AnalyticsZone } from "@/components/shell/AnalyticsZone";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <DashboardGrid>
          <LeetCodePanel />
          <GitHubPanel />
          <CodeforcesPanel />
          <CodeChefPanel />
        </DashboardGrid>
        
        <AnalyticsZone />
      </div>

      <Footer />
    </main>
  );
}
