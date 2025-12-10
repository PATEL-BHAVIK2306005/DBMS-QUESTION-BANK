import React, { useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { Search, ChevronDown, ChevronUp, BookOpen, Database, Layout, Shield, Server } from "lucide-react";

// --- Types ---
type Category = "All" | "Intro" | "ER Model" | "Relational Algebra" | "SQL" | "Normalization" | "Transactions";

interface Question {
  id: number;
  category: Category;
  question: string;
  answer: React.ReactNode;
}

// --- Data: The Question Bank ---
const questions: Question[] = [
  // --- SECTION 1: INTRODUCTION (1-10) ---
  {
    id: 1,
    category: "Intro",
    question: "List and explain the advantages of DBMS over file-based systems.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A DBMS overcomes file-system limitations in the following ways:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Control of Data Redundancy:</strong> DBMS centralizes data, storing it in one place to prevent duplication and save storage.</li>
          <li><strong>Data Consistency:</strong> Since data is not duplicated, updating it in one place updates it everywhere, avoiding mismatches.</li>
          <li><strong>Data Sharing:</strong> Multiple users and applications can access the same data simultaneously.</li>
          <li><strong>Improved Security:</strong> DBAs can define user access levels (Read/Write privileges) to protect sensitive data.</li>
          <li><strong>Data Integrity:</strong> Constraints (e.g., "Age > 18") are enforced automatically to ensure data validity.</li>
          <li><strong>Backup and Recovery:</strong> DBMS has built-in mechanisms to restore data automatically after a system failure.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    category: "Intro",
    question: "Draw and explain the 3-level architecture of DBMS.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>The 3-level (ANSI-SPARC) architecture separates user views from physical storage:</p>
        <div className="bg-slate-100 p-3 rounded-md border border-slate-300 font-mono text-sm text-center my-2">
          [ External Level (User Views) ]<br/>
          &darr;<br/>
          [ Conceptual Level (Logical Schema) ]<br/>
          &darr;<br/>
          [ Internal Level (Physical Storage) ]
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>External Level:</strong> The view closest to the user. It shows only relevant data (e.g., a student sees grades, not teacher salaries).</li>
          <li><strong>Conceptual Level:</strong> Describes <em>what</em> data is stored (tables, relationships) and hides physical details. DBAs work here.</li>
          <li><strong>Internal Level:</strong> Describes <em>how</em> data is stored on the disk (indexes, compression, block storage).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    category: "Intro",
    question: "Compare: DDL and DML.",
    answer: (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 border-slate-200 bg-slate-50">
            <tr>
              <th className="px-3 py-2">Feature</th>
              <th className="px-3 py-2">DDL (Definition)</th>
              <th className="px-3 py-2">DML (Manipulation)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-3 py-2 font-semibold">Purpose</td>
              <td className="px-3 py-2">Defines structure (schema).</td>
              <td className="px-3 py-2">Processes/Manipulates data.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Commands</td>
              <td className="px-3 py-2">CREATE, ALTER, DROP, TRUNCATE.</td>
              <td className="px-3 py-2">SELECT, INSERT, UPDATE, DELETE.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Effect</td>
              <td className="px-3 py-2">Affects the whole table.</td>
              <td className="px-3 py-2">Affects rows/records.</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Rollback</td>
              <td className="px-3 py-2">Auto-committed (cannot undo).</td>
              <td className="px-3 py-2">Can be rolled back.</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 4,
    category: "SQL",
    question: "What is the difference between DELETE and TRUNCATE commands?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Type:</strong> DELETE is DML; TRUNCATE is DDL.</li>
          <li><strong>Function:</strong> DELETE removes rows based on a WHERE condition. TRUNCATE resets the entire table.</li>
          <li><strong>Performance:</strong> TRUNCATE is faster because it deallocates data pages rather than logging every row deletion.</li>
          <li><strong>Rollback:</strong> DELETE can be rolled back; TRUNCATE cannot (it is auto-committed).</li>
          <li><strong>WHERE Clause:</strong> Allowed in DELETE, not in TRUNCATE.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 5,
    category: "Intro",
    question: "List and explain different categories of database users.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Naive Users:</strong> End-users who use standard forms/apps (e.g., bank clerks) without knowing SQL.</li>
          <li><strong>Application Programmers:</strong> Developers who write code (Java, Python) to interact with the DB.</li>
          <li><strong>Sophisticated Users:</strong> Analysts using SQL or tools to query data directly for reports.</li>
          <li><strong>Database Administrators (DBA):</strong> Super-users controlling the system, security, and schema.</li>
          <li><strong>Specialized Users:</strong> Users of CAD, AI, or expert systems with complex data requirements.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 6,
    category: "Intro",
    question: "List and explain different duties of a DBA.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Schema Definition:</strong> Creating the original database structure (tables, keys).</li>
          <li><strong>Storage Structure:</strong> Deciding how data is stored physically and setting up indexes.</li>
          <li><strong>Schema Modification:</strong> Altering the table structure if requirements change.</li>
          <li><strong>Granting Authorization:</strong> Managing user accounts and permissions (Security).</li>
          <li><strong>Maintenance:</strong> Performing backups, recovery, and performance tuning.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 7,
    category: "Intro",
    question: "Explain DBMS architecture with a block diagram description.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>The DBMS structure is divided into the Query Processor and Storage Manager.</p>
        <p><strong>1. Query Processor:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>DDL Interpreter:</strong> Processes schema definitions.</li>
          <li><strong>DML Compiler:</strong> Converts SQL queries into low-level instructions.</li>
          <li><strong>Query Engine:</strong> Executes the instructions.</li>
        </ul>
        <p><strong>2. Storage Manager:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Buffer Manager:</strong> Fetches data from disk to RAM.</li>
          <li><strong>Transaction Manager:</strong> Ensures ACID properties and concurrency.</li>
          <li><strong>File Manager:</strong> Manages disk space allocation.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 8,
    category: "ER Model",
    question: "Write a note on mapping cardinality in E-R diagram.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Cardinality defines the number of entities another entity can be associated with.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>One-to-One (1:1):</strong> One entity in A associates with one in B (e.g., Student - ID Card).</li>
          <li><strong>One-to-Many (1:M):</strong> One entity in A associates with many in B (e.g., Dept - Employees).</li>
          <li><strong>Many-to-One (M:1):</strong> Many entities in A associate with one in B (e.g., Students - Class).</li>
          <li><strong>Many-to-Many (M:M):</strong> Many in A associate with many in B (e.g., Student - Course).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 9,
    category: "ER Model",
    question: "Explain the difference between a weak and a strong entity set.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p><strong>Strong Entity Set:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Has a Primary Key.</li>
          <li>Independent existence.</li>
          <li>Represented by a single rectangle.</li>
        </ul>
        <p className="mt-2"><strong>Weak Entity Set:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No sufficient Primary Key (uses a Partial Key/Discriminator).</li>
          <li>Dependent on an Owner (Strong) Entity.</li>
          <li>Represented by a double rectangle.</li>
          <li>Example: A 'Dependent' in an insurance policy depends on the 'Employee'.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 10,
    category: "ER Model",
    question: "Explain the difference between generalization and specialization.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Specialization (Top-Down):</strong> Breaking a higher-level entity into lower-level sub-groups. (e.g., Person &rarr; Student, Teacher).</li>
          <li><strong>Generalization (Bottom-Up):</strong> Combining lower-level entities into a higher-level super-class. (e.g., Car, Truck &rarr; Vehicle).</li>
          <li><strong>Representation:</strong> Both use a triangle labeled "ISA" in ER diagrams.</li>
          <li><strong>Inheritance:</strong> Lower-level entities inherit attributes from higher-level ones in both cases.</li>
        </ul>
      </div>
    ),
  },

  // --- SECTION 2: ER MODEL & RELATIONAL MODEL (11-20) ---
  {
    id: 11,
    category: "ER Model",
    question: "Explain different types of Attributes in ER Model.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Simple:</strong> Atomic values (e.g., Roll No).</li>
          <li><strong>Composite:</strong> Can be divided into sub-parts (e.g., Name &rarr; First, Last).</li>
          <li><strong>Single-valued:</strong> Holds one value (e.g., Age).</li>
          <li><strong>Multi-valued:</strong> Holds multiple values (e.g., Phone Numbers), shown by double ellipse.</li>
          <li><strong>Derived:</strong> Calculated from other attributes (e.g., Age derived from DOB), shown by dashed ellipse.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 12,
    category: "Relational Algebra",
    question: "Explain Primary Key, Candidate Key, and Super Key.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Super Key:</strong> A set of one or more attributes that uniquely identify a record. It may contain extra attributes.</li>
          <li><strong>Candidate Key:</strong> A minimal Super Key. If any attribute is removed, it loses uniqueness. A table can have multiple candidate keys.</li>
          <li><strong>Primary Key:</strong> The specific Candidate Key chosen by the designer to identify records. It cannot be Null.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 13,
    category: "Relational Algebra",
    question: "Explain the fundamental operations of Relational Algebra.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Select (σ):</strong> Selects rows satisfying a condition. (Horizontal subset).</li>
          <li><strong>Project (π):</strong> Selects specific columns. (Vertical subset).</li>
          <li><strong>Union (∪):</strong> Combines rows from two tables (removes duplicates).</li>
          <li><strong>Set Difference (−):</strong> Returns rows in A but not in B.</li>
          <li><strong>Cartesian Product (×):</strong> Combines every row of A with every row of B.</li>
          <li><strong>Rename (ρ):</strong> Renames a table or output relation.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 14,
    category: "Relational Algebra",
    question: "Explain the different types of Joins.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Natural Join (⨝):</strong> Joins based on common attributes with same name and type.</li>
          <li><strong>Inner Join:</strong> Returns rows when there is a match in both tables.</li>
          <li><strong>Left Outer Join:</strong> Returns all rows from left table, and matched rows from right (or null).</li>
          <li><strong>Right Outer Join:</strong> Returns all rows from right table, and matched rows from left.</li>
          <li><strong>Full Outer Join:</strong> Returns all rows when there is a match in either table.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 15,
    category: "SQL",
    question: "Explain Integrity Constraints in SQL.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>NOT NULL:</strong> Ensures a column cannot have a null value.</li>
          <li><strong>UNIQUE:</strong> Ensures all values in a column are different.</li>
          <li><strong>PRIMARY KEY:</strong> A combination of NOT NULL and UNIQUE.</li>
          <li><strong>FOREIGN KEY:</strong> Ensures referential integrity; points to a PK in another table.</li>
          <li><strong>CHECK:</strong> Ensures values in a column satisfy a specific condition (e.g., Age &gt; 18).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 16,
    category: "SQL",
    question: "Explain Aggregate Functions in SQL with examples.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Aggregate functions perform a calculation on a set of values and return a single value.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>COUNT():</strong> Returns the number of rows. <code>SELECT COUNT(*) FROM Student;</code></li>
          <li><strong>SUM():</strong> Returns the total sum of a numeric column. <code>SELECT SUM(Salary) FROM Emp;</code></li>
          <li><strong>AVG():</strong> Returns the average value. <code>SELECT AVG(Marks) FROM Exams;</code></li>
          <li><strong>MIN():</strong> Returns the smallest value.</li>
          <li><strong>MAX():</strong> Returns the largest value.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 17,
    category: "SQL",
    question: "Differentiate between GROUP BY and ORDER BY.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>GROUP BY:</strong> Used to group rows that have the same values into summary rows (often used with aggregate functions). Example: Grouping students by Department to count them.</li>
          <li><strong>ORDER BY:</strong> Used to sort the result set in ascending or descending order. It does not aggregate data.</li>
          <li><strong>Sequence:</strong> In a query, GROUP BY comes before ORDER BY.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 18,
    category: "SQL",
    question: "What is a View? What are its advantages?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A View is a virtual table based on the result-set of an SQL statement. It does not store data physically.</p>
        <p><strong>Advantages:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Security:</strong> Hides sensitive columns from users (e.g., showing Name but hiding Salary).</li>
          <li><strong>Simplicity:</strong> Complex joins can be saved as a view, making queries simpler for users.</li>
          <li><strong>Consistency:</strong> Provides a consistent interface even if the underlying table structure changes.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 19,
    category: "SQL",
    question: "Explain Cursors in PL/SQL.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A Cursor is a temporary work area created in system memory when a SQL statement is executed. It allows row-by-row processing.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Implicit Cursor:</strong> Automatically created by Oracle for DML statements (INSERT, UPDATE, DELETE).</li>
          <li><strong>Explicit Cursor:</strong> Defined by the programmer for queries that return more than one row.</li>
          <li><strong>Steps:</strong> Declare &rarr; Open &rarr; Fetch &rarr; Close.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 20,
    category: "SQL",
    question: "What is a Trigger?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A Trigger is a stored procedure that automatically executes (fires) when a specific event occurs in the database.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Events:</strong> INSERT, UPDATE, DELETE.</li>
          <li><strong>Timing:</strong> BEFORE (to validate data) or AFTER (to log changes).</li>
          <li><strong>Level:</strong> Row-level (fires for each row) or Statement-level (fires once per query).</li>
          <li><strong>Use:</strong> Auditing, enforcing complex constraints, automatic backups.</li>
        </ul>
      </div>
    ),
  },

  // --- SECTION 3: NORMALIZATION (21-30) ---
  {
    id: 21,
    category: "Normalization",
    question: "What is Normalization? Why is it needed?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Normalization is the process of organizing data to minimize redundancy and dependency.</p>
        <p><strong>Need:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To reduce data redundancy (save space).</li>
          <li>To prevent <strong>Update Anomalies</strong> (data inconsistency).</li>
          <li>To prevent <strong>Insertion Anomalies</strong> (inability to add data without other data).</li>
          <li>To prevent <strong>Deletion Anomalies</strong> (accidental loss of data).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 22,
    category: "Normalization",
    question: "Explain Functional Dependency (FD).",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>FD represents a relationship between attributes. If A &rarr; B (A determines B), then for every unique value of A, there is a specific value of B.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Trivial FD:</strong> If B is a subset of A (e.g., AB &rarr; A).</li>
          <li><strong>Non-Trivial FD:</strong> If B is not a subset of A (e.g., ID &rarr; Name).</li>
          <li><strong>Full FD:</strong> Dependency on the full primary key, not part of it.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 23,
    category: "Normalization",
    question: "Explain 1st Normal Form (1NF).",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A relation is in 1NF if:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>It contains only <strong>atomic (indivisible)</strong> values.</li>
          <li>There are no repeating groups or arrays.</li>
          <li>Every column has a unique name.</li>
        </ul>
        <p><em>Example:</em> If a student has multiple phone numbers, they must be in separate rows, not comma-separated in one cell.</p>
      </div>
    ),
  },
  {
    id: 24,
    category: "Normalization",
    question: "Explain 2nd Normal Form (2NF).",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A relation is in 2NF if:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>It is already in <strong>1NF</strong>.</li>
          <li>It has <strong>No Partial Dependency</strong>.</li>
        </ul>
        <p><em>Partial Dependency:</em> Occurs when a non-prime attribute depends on only <em>part</em> of a composite primary key. In 2NF, every non-key attribute must depend on the <em>whole</em> primary key.</p>
      </div>
    ),
  },
  {
    id: 25,
    category: "Normalization",
    question: "Explain 3rd Normal Form (3NF).",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A relation is in 3NF if:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>It is in <strong>2NF</strong>.</li>
          <li>It has <strong>No Transitive Dependency</strong>.</li>
        </ul>
        <p><em>Transitive Dependency:</em> When A &rarr; B and B &rarr; C. To be in 3NF, non-key attributes must depend <em>only</em> on the Candidate Key, not on other non-key attributes.</p>
      </div>
    ),
  },
  {
    id: 26,
    category: "Normalization",
    question: "Explain BCNF (Boyce-Codd Normal Form).",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>BCNF is a stricter version of 3NF.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>A table is in BCNF if for every non-trivial functional dependency <strong>X &rarr; Y</strong>, <strong>X</strong> must be a <strong>Super Key</strong>.</li>
          <li>It handles cases where a candidate key overlaps or there are multiple candidate keys, which 3NF might miss.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 27,
    category: "Normalization",
    question: "What is Lossless Join Decomposition?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>When a table is decomposed into smaller tables (normalization), we must be able to join them back to get the original table without losing data or creating fake (spurious) tuples.</p>
        <p><strong>Condition:</strong> The common attribute between the two tables must be a candidate key (or super key) for at least one of them.</p>
      </div>
    ),
  },
  {
    id: 28,
    category: "Normalization",
    question: "What is Multi-valued Dependency (4NF)?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Occurs when one key determines multiple independent attributes.</p>
        <p><em>Example:</em> A Course has many Books and many Lecturers. Books and Lecturers are independent. Storing them in one table creates redundancy.</p>
        <p><strong>4NF:</strong> A table is in 4NF if it is in BCNF and has no multi-valued dependencies.</p>
      </div>
    ),
  },
  {
    id: 29,
    category: "Transactions",
    question: "Define Transaction and its states.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A Transaction is a logical unit of work (a set of operations) that must be executed as a whole.</p>
        <p><strong>States:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Active:</strong> Execution begins.</li>
          <li><strong>Partially Committed:</strong> Final statement executed, but not saved to disk yet.</li>
          <li><strong>Committed:</strong> Successfully saved.</li>
          <li><strong>Failed:</strong> Error occurred.</li>
          <li><strong>Aborted:</strong> Rolled back to previous state.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 30,
    category: "Transactions",
    question: "Explain ACID properties.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Atomicity:</strong> All or Nothing. The transaction happens completely or not at all.</li>
          <li><strong>Consistency:</strong> Database goes from one valid state to another (integrity preserved).</li>
          <li><strong>Isolation:</strong> Concurrent transactions do not interfere with each other.</li>
          <li><strong>Durability:</strong> Once committed, changes are permanent even if system fails.</li>
        </ul>
      </div>
    ),
  },

  // --- SECTION 4: TRANSACTIONS & CONCURRENCY (31-40) ---
  {
    id: 31,
    category: "Transactions",
    question: "What is a Schedule? Serial vs Concurrent Schedule.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A Schedule is the order in which instructions of multiple transactions are executed.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Serial Schedule:</strong> Transactions are executed one after another (no interleaving). Slow but consistent.</li>
          <li><strong>Concurrent Schedule:</strong> Instructions of transactions are interleaved. Faster but needs concurrency control.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 32,
    category: "Transactions",
    question: "Explain Serializability.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A concurrent schedule is <strong>Serializable</strong> if its outcome is equal to the outcome of some serial execution of the same transactions.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Conflict Serializability:</strong> Checked by swapping non-conflicting instructions.</li>
          <li><strong>View Serializability:</strong> Less strict, ensures read/write views are preserved.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 33,
    category: "Transactions",
    question: "What are the problems of Concurrency?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Dirty Read:</strong> Reading uncommitted data from another transaction that might fail.</li>
          <li><strong>Lost Update:</strong> Two transactions update the same value, and one overwrite is lost.</li>
          <li><strong>Unrepeatable Read:</strong> Reading the same value twice yields different results because another transaction updated it in between.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 34,
    category: "Transactions",
    question: "Explain Lock-Based Protocols.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Locks manage access to data items to ensure isolation.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Shared Lock (S):</strong> Read-only. Multiple transactions can hold S-lock.</li>
          <li><strong>Exclusive Lock (X):</strong> Read and Write. Only one transaction can hold X-lock.</li>
          <li><strong>2-Phase Locking (2PL):</strong> Growing Phase (acquire locks) &rarr; Shrinking Phase (release locks). Ensures serializability.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 35,
    category: "Transactions",
    question: "What is Deadlock? How is it handled?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Deadlock is a situation where two transactions are waiting for each other to release locks, causing a standstill.</p>
        <p><strong>Handling:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Prevention:</strong> Wait-Die or Wound-Wait schemes.</li>
          <li><strong>Detection:</strong> Wait-for graph (cycle detection).</li>
          <li><strong>Recovery:</strong> Rollback one of the transactions (victim selection) to break the cycle.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 36,
    category: "Transactions",
    question: "Explain Timestamp Ordering Protocol.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A deadlock-free protocol where transactions are ordered by their start time (Timestamp).</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Every data item has a Read-Timestamp and Write-Timestamp.</li>
          <li>If a transaction tries to read/write data that was written by a <em>younger</em> transaction, the operation is rejected and the transaction is restarted.</li>
          <li>Ensures serializability without locks.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 37,
    category: "Intro",
    question: "Explain Hashing and its types.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>Hashing is a technique to directly find the location of a record on disk using a hash function on the search key.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Static Hashing:</strong> Number of buckets is fixed. Can lead to overflow chains.</li>
          <li><strong>Dynamic (Extendible) Hashing:</strong> Directory grows/shrinks as data is added/removed. Handles varying database sizes better.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 38,
    category: "Intro",
    question: "Explain B+ Tree Indexing.",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>B+ Tree is a balanced tree data structure used for indexing.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Balanced:</strong> All leaf nodes are at the same depth.</li>
          <li><strong>Leaf Nodes:</strong> Store actual data pointers and are linked (linked list) for efficient range queries.</li>
          <li><strong>Internal Nodes:</strong> Store only keys for navigation.</li>
          <li><strong>Advantage:</strong> Fast insertion, deletion, and search (Log N).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 39,
    category: "SQL",
    question: "What is a Stored Procedure?",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>A Stored Procedure is a prepared SQL code that you can save, so the code can be reused over and over again.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Modular:</strong> Logic is stored in the DB, reducing network traffic.</li>
          <li><strong>Security:</strong> Users can execute the procedure without accessing tables directly.</li>
          <li><strong>Performance:</strong> Pre-compiled, so it executes faster than raw SQL.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 40,
    category: "Transactions",
    question: "Explain Log-Based Recovery (Deferred vs Immediate).",
    answer: (
      <div className="space-y-2 text-slate-700">
        <p>The system maintains a log file to record all transaction operations for recovery.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Deferred Update:</strong> Writes to the database are done only after the transaction commits. If crash happens before commit, no undo needed.</li>
          <li><strong>Immediate Update:</strong> Writes are applied to the database immediately (before commit). If crash happens, log is used to UNDO changes.</li>
        </ul>
      </div>
    ),
  },
];

// --- Components ---

const Header = () => (
  <header className="bg-slate-900 text-white py-8 px-4 shadow-lg">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Database className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold tracking-tight">DBMS Question Bank</h1>
      </div>
      <p className="text-slate-400 text-lg">
        Comprehensive 5-mark solutions for exam preparation.
      </p>
    </div>
  </header>
);

const CategoryFilter = ({
  selected,
  onSelect,
}: {
  selected: Category;
  onSelect: (c: Category) => void;
}) => {
  const categories: Category[] = [
    "All",
    "Intro",
    "ER Model",
    "Relational Algebra",
    "SQL",
    "Normalization",
    "Transactions",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

const QuestionCard = ({ q, isOpen, onToggle }: { q: Question; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 focus:outline-none"
      >
        <div className="flex items-start gap-4">
          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
            {q.id}
          </span>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg leading-tight">{q.question}</h3>
            <span className="inline-block mt-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {q.category}
            </span>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 pl-16 pr-6 animate-fadeIn">
          <div className="h-px bg-slate-100 mb-4 w-full"></div>
          <div className="markdown-body text-slate-700 leading-relaxed">
            {q.answer}
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
      const matchesSearch =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toString().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
            placeholder="Search questions (e.g., 'Normalization', 'Acid', '12')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Question List */}
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                q={q}
                isOpen={openQuestionId === q.id}
                onToggle={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200 border-dashed">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No questions found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>End of Question Bank</p>
        </div>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
